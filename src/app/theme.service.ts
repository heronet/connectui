import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSource = new Subject<void>();
  theme$ = this.themeSource.asObservable();
  constructor() {}
  toggleTheme() {
    this.themeSource.next();
  }
  checkIfDarkOnInit() {
    const theme = localStorage.getItem('theme') ?? 'light';
    if (theme === 'dark') return true;
    else return false;
  }
}
