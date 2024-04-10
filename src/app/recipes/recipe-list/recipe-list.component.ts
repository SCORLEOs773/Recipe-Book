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
  showUserRecipesOnly: boolean = false;

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

  onMyRecipes() {
    this.showUserRecipesOnly = !this.showUserRecipesOnly; // Toggle the mode
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  // filteredRecipes(): Recipe[] {
  //   if (this.searchQuery && this.searchQuery.trim()) {
  //     return this.recipes.filter(recipe => {
  //       return recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || recipe.description.toLowerCase().includes(this.searchQuery.toLowerCase());
  //     });
  //   } else {
  //     return this.recipes;
  //   }
  // }

  filteredRecipes(): Recipe[] {
    if (this.searchQuery && this.searchQuery.trim()) {
      return this.recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || recipe.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    } else {
      if (this.showUserRecipesOnly) {
        const userId = localStorage.getItem('userId'); // Get the currently logged-in user's ID
        return this.recipes.filter(recipe => recipe.userId === userId); // Filter recipes based on userId
      } else {
        return this.recipes;
      }
    }
  }

  getMyRecipesButtonText(): string {
    return this.showUserRecipesOnly ? 'View All Recipes' : 'View My Recipes';
  }

}
