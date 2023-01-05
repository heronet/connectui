import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { authDto, loginDto } from '../authdto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  login(data: NgForm) {
    const info: loginDto = {
      email: data.value.email,
      password: data.value.password,
    };

    this.authService.login(info).subscribe({
      next: (res) => {
        this.authService.setData(res);
        this.router.navigateByUrl('/');
      },
      error: (err) => console.log(err),
      complete: () => {},
    });
  }
}
