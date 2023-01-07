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
  constructor(private authService: AuthService, private router: Router) {}
  login(data: NgForm) {
    const info: RegisterDto = {
      email: data.value.email,
      password: data.value.password,
    };

    this.authService.register(info).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => console.log(err),
      complete: () => {},
    });
  }
}
