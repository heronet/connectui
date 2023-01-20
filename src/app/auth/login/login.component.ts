import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginDto } from '../authdto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = false;
  errors: string[] = [];
  constructor(private authService: AuthService, private router: Router) {}
  login({ value }: NgForm) {
    this.errors = [];

    const email = value.email?.trim();
    const password = value.password?.trim();
    if (!email) this.errors.push('Email is required');
    if (!password) this.errors.push('Password is required');

    if (!email || !password) return;
    const info: LoginDto = {
      email,
      password,
    };

    this.isLoading = true;
    this.authService.login(info).subscribe({
      next: () => {
        this.isLoading = false;
        this.errors = [];
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
        if (typeof err.error === 'string') this.errors = [err.error];
        else this.errors = [err.statusText];
      },
    });
  }
}
