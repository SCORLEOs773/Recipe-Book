import { Subscription } from 'rxjs/Subscription';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input() recipes: Recipe[];
  subscription: Subscription;
  // filteredRecipes: Recipe[] = [];
  isSmallScreen: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recipes = this.recipeService.getRecipes();
    // this.filteredRecipes = this.recipes;
  }

  ngOnInit() {
    this.checkScreenSize();
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  filteredRecipes(): Recipe[] {
    if (this.searchQuery && this.searchQuery.trim()) {
      return this.recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || recipe.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    } else {
      return this.recipes;
    }
  }

}
