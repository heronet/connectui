import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthDto } from 'src/app/auth/authdto';
import { User } from 'src/app/models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading = false;
  authData: AuthDto | undefined;
  private authSub = new Subscription();
  user: User | undefined;
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authSub = this.authService.authData$.subscribe({
      next: (data) => {
        this.authData = data;
        this.getUserInfo(data!.id);
      },
    });
  }
  getUserInfo(id: string) {
    this.isLoading = true;
    this.usersService.getUserData(id).subscribe({
      next: (data) => {
        this.user = data;
        console.log(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
