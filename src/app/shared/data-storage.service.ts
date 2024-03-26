import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaust, exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Token } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class DataStorageService{
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://the-food-book-437b3-default-rtdb.firebaseio.com/recipes.json', recipes)
    .subscribe(response => console.log(response));
  }

  fetchRecipes(){
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipe[]>('https://the-food-book-437b3-default-rtdb.firebaseio.com/recipes.json',
      {
        params: new HttpParams().set('auth', user.token)
      }
      );
    }), map(recipes => {
      return recipes.map(recipe => {
        return{...recipe, ingredients: recipe.ingredients? recipe.ingredients: []};
      });
    }), tap(recipes => {
      this.recipeService.setRecipes(recipes)
    }));
  }

}
