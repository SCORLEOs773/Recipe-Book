import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();
  // dataStorageService: any;

  constructor(private dataStorageService: DataStorageService) {}

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
}
onFetchData(){
  this.dataStorageService.fetchRecipes();
}

}
