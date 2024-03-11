import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'A Tasty Recipe',
      'Recipe Description!',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFfTU5KukeOHaAEA-pPaO_oO0AAAtNuufZA&usqp=CAU'
    ),
    new Recipe(
      'Another Tasty Recipe',
      'Recipe Description!',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFfTU5KukeOHaAEA-pPaO_oO0AAAtNuufZA&usqp=CAU'
    ),
  ];

  constructor() {}
  ngOnInit(): void {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
