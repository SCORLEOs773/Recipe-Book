import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string;
  email: string;
  userRecipes: Recipe[];

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Fetch user data
      this.dataStorageService.fetchUser(userId).subscribe(
        (user: any) => {
          if (user) {
            this.username = user.username;
            this.email = user.email;
          }
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );

      // Fetch user's recipes
      this.dataStorageService.fetchRecipes().subscribe(
        (recipes: Recipe[]) => {
          // Filter recipes by userId
          this.userRecipes = recipes.filter(
            (recipe) => recipe.userId === userId
          );
        },
        (error) => {
          console.error('Error fetching recipes:', error);
        }
      );
    }
  }
}
