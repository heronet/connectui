import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}
}
