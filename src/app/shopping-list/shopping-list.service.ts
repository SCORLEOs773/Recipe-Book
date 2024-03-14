import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  unsubscrice() {
    throw new Error('Method not implemented.');
  }
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingridients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

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
}
