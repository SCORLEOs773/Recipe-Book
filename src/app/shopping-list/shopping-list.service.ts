import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingridients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngridients() {
    return this.ingridients.slice();
  }

  addIngredient(ingridient: Ingredient) {
    this.ingridients.push(ingridient);
    this.ingredientsChanged.emit(this.ingridients.slice());
  }

  addingredients(ingridients: Ingredient[]) {
    this.ingridients.push(...ingridients);
    this.ingredientsChanged.emit(this.ingridients.slice());
  }
}
