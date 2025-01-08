import { Component } from '@angular/core';
import { Recipe } from './random-recipe.model';
import { MealService } from './meal.service';

@Component({
  selector: 'app-random-recipe',
  templateUrl: './random-recipe.component.html',
  styleUrl: './random-recipe.component.css',
})
export class RandomRecipeComponent {
  recipe!: Recipe;

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.getRandomRecipe();
  }

  getRandomRecipe() {
    this.mealService.getRandomRecipe().subscribe((data) => {
      if (data.meals && data.meals.length > 0) {
        this.recipe = data.meals[0];
      }

      if (!this.recipe) return [];
      return Object.keys(this.recipe)
        .filter((key) => key.startsWith('strIngredient') && this.recipe[key])
        .map((key) => this.recipe[key]);
    });
  }
}
