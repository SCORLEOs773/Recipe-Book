import { Component, HostListener, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';

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
  isLiked: boolean = false;
  authorName: string = '';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.checkScreenSize();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);

      if (this.recipe) {
        const userId = this.recipe.userId;
        if (userId) {
          this.isLiked = this.recipeService.isRecipeLiked(this.id, userId);

          // Fetch author name based on userId
          this.dataStorageService
            .getAuthorName(userId)
            .then((username: string) => {
              this.authorName = username;
            })
            .catch((error) => {
              console.error('Error fetching author name:', error);
              this.authorName = 'Anonymous'; // Set default username if error occurs
            });
        }
      }
    });
  }

  onLike() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      if (this.isLiked) {
        // Unlike the recipe
        this.recipeService.unlikeRecipe(this.id, userId);
        this.recipe.likeCount--;
      } else {
        // Like the recipe
        this.recipeService.likeRecipe(this.id, userId);
        this.recipe.likeCount++;
      }
      // Toggle like status
      this.isLiked = !this.isLiked;
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
