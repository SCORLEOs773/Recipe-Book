import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  [x: string]: any;

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Easy Pancakes',
      'Learn a skill for life with our foolproof easy crêpe recipe that ensures perfect pancakes every time – elaborate flip optional',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1273477_8-ad36e3b.jpg?quality=90&webp=true&resize=375,341',
      [
        new Ingredient('Flour', 1),
        new Ingredient('Egg', 2),
        new Ingredient('Milk', 1),
        new Ingredient('Butter', 1),
        new Ingredient('Sugar', 1),
        new Ingredient('Salt', 1),
        new Ingredient('Vanilla Extract', 1),
      ]
    ),
    new Recipe(
      'Ultimate Spaghetti Carbonara Recipe',
      'Discover how to make traditional spaghetti carbonara. This classic Italian pasta dish combines a silky cheese sauce with crisp pancetta and black pepper.',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&webp=true&resize=375,341',
      [
        new Ingredient('Spaghetti', 1),
        new Ingredient('Egg', 2),
        new Ingredient('Pancetta', 1),
        new Ingredient('Parmesan', 1),
        new Ingredient('Olive Oil', 1),
        new Ingredient('Garlic', 1),
        new Ingredient('Black Pepper', 1),
        new Ingredient('Salt', 1),
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(inedx: number) {
    return this.recipes[inedx];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this.slService.addIngredient(ingredient);
    });
  }
}
