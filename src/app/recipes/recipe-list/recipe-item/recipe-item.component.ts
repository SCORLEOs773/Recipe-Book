import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { DataStorageService } from '../../../shared/data-storage.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  authorName: string = '';

  constructor(
    private dataStorageService: DataStorageService,
    private cookieService: CookieService
  ) {}

  getTruncatedDescription(description: string, wordCount: number): string {
    const words = description.split(' ');
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(' ') + '...';
    } else {
      return description;
    }
  }

  // ngOnInit() {
  //   const userId = this.recipe.userId;
  //   this.dataStorageService
  //     .getAuthorName(userId)
  //     .then((username: string) => {
  //       this.authorName = username;
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching author name:', error);
  //       this.authorName = 'Anonymous'; // Set default username if error occurs
  //     });
  // }

  ngOnInit() {
    const userId = this.recipe.userId;
    const cachedAuthorName = this.cookieService.get(`author_${userId}`);
    if (cachedAuthorName) {
      this.authorName = cachedAuthorName;
    } else {
      this.dataStorageService
        .getAuthorName(userId)
        .then((username: string) => {
          this.authorName = username;
          // Store author name in cookie with expiration time
          this.cookieService.set(`author_${userId}`, username, 7); // Expires in 7 days
        })
        .catch((error) => {
          console.error('Error fetching author name:', error);
          this.authorName = 'Anonymous'; // Set default username if error occurs
        });
    }
  }
}
