import { Component } from '@angular/core';
import { MealService } from '../random-recipe/meal.service';
import { Recipe } from '../random-recipe/random-recipe.model';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.css',
})
export class RecipeSearchComponent {
  recipe!: Recipe;
  searchQuery;
  noRecipeFound: boolean = false;
  selectedCategory;
  selectedArea;
  recipes: Recipe[] = [];
  categories;
  areas;

  constructor(public mealService: MealService) {}

  searchRecipe() {
    if (this.searchQuery) {
      this.mealService.getRecipeByName(this.searchQuery).subscribe(
        (response) => {
          this.recipes = response.meals || [];
          this.noRecipeFound = this.recipes.length === 0;
        },
        (error) => {
          console.error('Error fetching recipe:', error);
          this.noRecipeFound = true;
        }
      );
    } else {
      this.recipes = [];
      this.noRecipeFound = false;
    }
  }

  filterRecipes() {
    const area = this.selectedArea || '';
    const category = this.selectedCategory || '';

    this.mealService.getFilteredRecipes(category, area).subscribe(
      (response) => {
        this.recipes = response || [];
        this.noRecipeFound = this.recipes.length === 0;
      },
      (error) => {
        console.error('Error fetching filtered recipes:', error);
        this.noRecipeFound = true;
      }
    );
  }
}
