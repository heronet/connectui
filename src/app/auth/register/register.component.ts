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
  constructor(private authService: AuthService, private router: Router) {}
  login(data: NgForm) {
    this.isLoading = true;
    const info: RegisterDto = {
      email: data.value.email,
      password: data.value.password,
      name: data.value.name,
    };

    this.authService.register(info).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {},
    });
  }
}
