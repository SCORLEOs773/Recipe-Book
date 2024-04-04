import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  [x: string]: any;


  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Easy Pancakes',
  //     'Learn a skill for life with our foolproof easy crêpe recipe that ensures perfect pancakes every time – elaborate flip optional',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1273477_8-ad36e3b.jpg?quality=90&webp=true&resize=375,341',
  //     [
  //       new Ingredient('Flour', 1),
  //       new Ingredient('Egg', 2),
  //       new Ingredient('Milk', 1),
  //       new Ingredient('Butter', 1),
  //       new Ingredient('Sugar', 1),
  //       new Ingredient('Salt', 1),
  //       new Ingredient('Vanilla Extract', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Ultimate Spaghetti Carbonara Recipe',
  //     'Discover how to make traditional spaghetti carbonara. This classic Italian pasta dish combines a silky cheese sauce with crisp pancetta and black pepper.',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&webp=true&resize=375,341',
  //     [
  //       new Ingredient('Spaghetti', 1),
  //       new Ingredient('Egg', 2),
  //       new Ingredient('Pancetta', 1),
  //       new Ingredient('Parmesan', 1),
  //       new Ingredient('Olive Oil', 1),
  //       new Ingredient('Garlic', 1),
  //       new Ingredient('Black Pepper', 1),
  //       new Ingredient('Salt', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Ultimate chocolate cake',
  //     'Indulge yourself with this ultimate chocolate ganache cake recipe that is beautifully moist, rich and fudgy. Perfect for a celebration or an afternoon tea',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1043451_11-4713959.jpg?quality=90&webp=true&resize=300,272',
  //     [
  //       new Ingredient('Butter', 1),
  //       new Ingredient('Sugar', 1),
  //       new Ingredient('Vanilla Extract', 1),
  //       new Ingredient('Chocolate', 1),
  //       new Ingredient('Cream', 1),
  //       new Ingredient('Self Rising Flour', 1),
  //       new Ingredient('Golden Caster Sugar', 1),
  //       new Ingredient('Salt', 1),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private http: HttpClient) {}

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipe(inedx: number) {
    return this.recipes[inedx];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this.slService.addIngredient(ingredient);
    });
  }

  addRecipe(recipe: Recipe) {
    recipe.userId = localStorage.getItem('userId');
    recipe.id = String(this.generateNewId());
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }


  // updateRecipe(index: number, newRecipe: Recipe, recipe: Recipe) {
  //   console.log(recipe.userId, localStorage.getItem('userId'));
  //   if (recipe.userId !== localStorage.getItem('userId')) {
  //     return;
  //   }
  //     this.recipes[index] = newRecipe;
  //     this.recipeChanged.next(this.recipes.slice());
  // }


  updateRecipe(index: number, newRecipe: Recipe) {
    const userId = localStorage.getItem('userId');
    const oldRecipe = this.recipes[index];

    if (oldRecipe.userId !== userId) {
      return; // Prevent updating recipes not owned by the current user
    }

    newRecipe.userId = userId; // Update userId of the edited recipe
    newRecipe.id = oldRecipe.id; // Ensure the id of the edited recipe is maintained

    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());

    // Save updated recipes to the database
    this.dataStorageService.storeRecipes().subscribe(
      () => {
        console.log('Recipes updated successfully!');
      },
      (error) => {
        console.error('Failed to update recipes:', error);
      }
    );
  }

  deleteRecipe(index: number) {
    if (this.recipes[index].userId !== localStorage.getItem('userId')) {
      return;
    }
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  private generateNewId(): number {
    const maxId = this.recipes.reduce((max, recipe) => (+recipe.id > max ? recipe.id : max), 0);
    return +maxId + 1; // Convert maxId to number using '+'
  }

}
