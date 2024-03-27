// recipes.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input() recipes: Recipe[];
  filteredRecipes: Recipe[] = [];
  @Input() searchQuery: string;
  
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.dataStorageService.fetchRecipes().subscribe(recipes => {
      this.recipes = this.filteredRecipes = recipes;
    });
  }

  onSearch() {
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
