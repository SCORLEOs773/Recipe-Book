import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public userId: string;
  public authorName: string;

  constructor(
    id: string,
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[],
    userId: string,
    authorName: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.userId = userId;
    this.authorName = authorName;
  }
}
