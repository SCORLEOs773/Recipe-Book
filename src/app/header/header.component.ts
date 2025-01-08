import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from './../shared/data-storage.service';
import {
  Component,
  DoCheck,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy, DoCheck {
  @Output() featureSelected = new EventEmitter<string>();

  isAdmin: boolean = false;
  // isAdmin = localStorage.getItem('isAdmin');
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.isAuthenticated = !!user;
    });
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');
    window.addEventListener('storage', (event) => {
      if (event.key === 'isAdmin') {
        this.isAdmin = JSON.parse(event.newValue || 'false');
        // Trigger change detection when isAdmin changes
        this.cdr.detectChanges();
      }
    });
  }

  ngDoCheck() {
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
