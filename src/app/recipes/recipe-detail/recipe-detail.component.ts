import { Component, HostListener, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

declare const $: any;


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {

  id: string;
  recipe: Recipe;
  isSmallScreen: boolean = false;
  currentRecipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  // ngOnInit() {
  //   this.checkScreenSize();
  //   this.route.params.subscribe((params: Params) => {
  //     this.id = params['id'];
  //     this.recipe = this.recipeService.getRecipeById(this.id);
  //   });
  // }

  ngOnInit() {
    this.checkScreenSize();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }

  onLike() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const liked = this.recipeService.likeRecipe(this.id, userId);
      if (liked) {
        // If the user successfully liked the recipe, update the recipe details
        this.recipe = this.recipeService.getRecipeById(this.id);
      } else {
        // Inform the user that they have already liked the recipe
        alert('You have already liked this recipe.');
      }
    }
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id); // Delete recipe using ID
    this.router.navigate(['delete'], { relativeTo: this.route });
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768;
  }
}
