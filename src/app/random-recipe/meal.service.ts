import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './random-recipe.model';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getRandomRecipe(): Observable<{ meals: Recipe[] }> {
    return this.http.get<{ meals: Recipe[] }>(`${this.baseUrl}/random.php`);
  }

  getIngredients(recipe: Recipe): string[] {
    return Object.keys(recipe)
      .filter((key) => key.startsWith('strIngredient') && recipe[key])
      .map((key) => recipe[key]);
  }

  getRecipeByName(name: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/search.php?s=${name}`);
  }

  getFilteredRecipes(category: string, area: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${this.baseUrl}/filter.php?c=${category}&a=${area}`
    );
  }
}
