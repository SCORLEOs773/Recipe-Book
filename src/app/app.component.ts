import { AuthService } from './auth/auth.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipe';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
