import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://the-food-book-437b3-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => console.log(response));
  }

  fetchRecipes(searchQuery: string = '') {
    // Adjust the URL to include search query parameters if necessary
    let url = 'https://the-food-book-437b3-default-rtdb.firebaseio.com/recipes.json';
    if (searchQuery) {
      const params = new HttpParams().set('searchQuery', searchQuery);
      url += `?${params.toString()}`;
    }

    return this.http.get<Recipe[]>(url)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
