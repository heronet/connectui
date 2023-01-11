import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private authSub = new Subscription();
  isAuthenticated = false;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authSub = this.authService.authData$.subscribe({
      next: (data) =>
        data ? (this.isAuthenticated = true) : (this.isAuthenticated = false),
      error: (err) => console.log(err),
    });
  }
  logout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
