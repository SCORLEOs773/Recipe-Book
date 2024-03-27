import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Input() searchQuery: string;
  recipes: Recipe[];
  subscription: Subscription;
  filteredRecipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recipes = this.recipeService.getRecipes();
    this.filteredRecipes = this.recipes;
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  filterRecipes() {
    if (this.searchQuery) {
      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredRecipes = this.recipes;
    }
  }
}
