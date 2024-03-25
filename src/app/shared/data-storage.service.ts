import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { RecipeService } from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class dataStorageService{
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://the-food-book-437b3-default-rtdb.firebaseio.com/recipes.json', recipes)
  }
}
