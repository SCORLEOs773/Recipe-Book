import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { DataStorageService } from '../../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  authorName: string = '';

  constructor(private dataStorageService: DataStorageService) {}

  getTruncatedDescription(description: string, wordCount: number): string {
    const words = description.split(' ');
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(' ') + '...';
    } else {
      return description;
    }
  }

  ngOnInit() {
    const userId = this.recipe.userId;
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
