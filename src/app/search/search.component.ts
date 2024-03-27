import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchQuery = new EventEmitter<string>();

  onSearch(query: string) {
    this.searchQuery.emit(query);
  }
}
