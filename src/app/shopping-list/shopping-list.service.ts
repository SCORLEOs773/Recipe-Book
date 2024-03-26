import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingridients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  unsubscribe() {
    throw new Error('Method not implemented.');
  }

  getIngredient(index: number): Ingredient {
    return this.ingridients[index];
  }

  getIngridients() {
    return this.ingridients.slice();
  }

  addIngredient(ingridient: Ingredient) {
    this.ingridients.push(ingridient);
    this.ingredientsChanged.next(this.ingridients.slice());
  }

  addingredients(ingridients: Ingredient[]) {
    this.ingridients.push(...ingridients);
    this.ingredientsChanged.next(this.ingridients.slice());
  }

  updateIngridient(index: number, newIngridient: Ingredient) {
    this.ingridients[index] = newIngridient;
    this.ingredientsChanged.next(this.ingridients.slice());
  }

  deleteIngredient(index: number) {
    this.ingridients.splice(index, 1);
    this.ingredientsChanged.next(this.ingridients.slice());
  }
}
