import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/authdto';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private authSub = new Subscription();
  authData: AuthDto | undefined;
  isDark = this.themeService.checkIfDarkOnInit();

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}
  ngOnInit(): void {
    this.authSub = this.authService.authData$.subscribe({
      next: (data) => (this.authData = data),
      error: (err) => console.log(err),
    });
  }
  logout() {
    this.authService.logout();
  }
  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = !this.isDark;
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
