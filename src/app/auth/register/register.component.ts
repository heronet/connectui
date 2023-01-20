import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterDto } from '../authdto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLoading = false;
  errors: string[] = [];
  constructor(private authService: AuthService, private router: Router) {}
  register({ value }: NgForm) {
    this.errors = [];

    const email = value.email?.trim();
    const password = value.password?.trim();
    const name = value.name?.trim();

    if (!name) this.errors.push('Name is required');
    if (!email) this.errors.push('Email is required');
    if (!password) this.errors.push('Password is required');

    if (!email || !name || !password) return;

    const info: RegisterDto = {
      email,
      password,
      name,
    };

    this.isLoading = true;
    this.authService.register(info).subscribe({
      next: () => {
        this.isLoading = false;
        this.errors = [];
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
        if (err.error.errors)
          this.errors = err.error.errors.map((obj: any) => obj.description);
        else this.errors = [err.statusText];
      },
    });
  }
}
