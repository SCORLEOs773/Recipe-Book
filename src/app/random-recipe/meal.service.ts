import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './random-recipe.model';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  recipe!: any;
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getRandomRecipe(): Observable<{ meals: Recipe[] }> {
    return this.http.get<{ meals: Recipe[] }>(`${this.baseUrl}/random.php`);
  }

  getIngredients(): string[] {
    return Object.keys(this.recipe)
      .filter((key) => key.startsWith('strIngredient') && this.recipe[key])
      .map((key) => this.recipe[key]);
  }
}
