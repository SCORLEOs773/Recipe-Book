import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(
        'https://the-food-book-437b3-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => console.log(response));
  }

  fetchRecipes(searchQuery: string = '') {
    // Adjust the URL to include search query parameters if necessary
    let url =
      'https://the-food-book-437b3-default-rtdb.firebaseio.com/recipes.json';
    if (searchQuery) {
      const params = new HttpParams().set('searchQuery', searchQuery);
      url += `?${params.toString()}`;
    }

    return this.http.get<Recipe[]>(url).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }

  storeUser(userId: string, username: string) {
    const userData = { userId, username };
    console.log('User data stored successfully.', userData);
    return this.http.put(
      `https://the-food-book-437b3-default-rtdb.firebaseio.com/users/${userId}.json`,
      userData
    );
  }

  getAuthorName(userId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http
        .get<{ username: string }>(
          `https://the-food-book-437b3-default-rtdb.firebaseio.com/users/${userId}.json`
        )
        .subscribe(
          (userData) => {
            if (userData && userData.username) {
              resolve(userData.username);
            } else {
              resolve('Anonymous');
            }
          },
          (error) => {
            console.error('Error fetching author name:', error);
            reject(error);
          }
        );
    });
  }

  fetchUser(userId: string) {
    return this.http.get(
      `https://the-food-book-437b3-default-rtdb.firebaseio.com/users/${userId}.json`
    );
  }
}
