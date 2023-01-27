import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/authdto';
import { User } from '../models/user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  isLoading = false;
  isConnectLoading = false;
  authSub = new Subscription();
  users: User[] = [];
  authData: AuthDto | undefined;
  connectedUsers: string[] = [];

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.authData$.subscribe({
      next: (data) => (this.authData = data),
    });

    this.getUsers();
    this.getConnectedUsers();
  }
  connectUser(user: User) {
    this.isConnectLoading = true;
    this.usersService.connectUser(user.id).subscribe({
      next: (user) => {
        this.isConnectLoading = false;
        this.connectedUsers.push(user.id);
      },
      error: (err) => {
        console.log(err);
        this.isConnectLoading = false;
      },
    });
  }
  isConnected(user: User) {
    return this.connectedUsers.includes(user.id);
  }
  getUsers() {
    this.isLoading = true;
    this.usersService.fetchUsers().subscribe({
      next: (users) => {
        this.users = users.filter((u) => u.id !== this.authData?.id);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  getConnectedUsers() {
    this.isConnectLoading = true;
    this.usersService.fetchConnectedUsers().subscribe({
      next: (users) => {
        this.connectedUsers = users.map((u) => u.id);
        this.isConnectLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isConnectLoading = false;
      },
    });
  }
  startChat(user: User) {
    this.isConnectLoading = true;
    this.usersService.fetchOneToOneChatId(user.id).subscribe({
      next: (c) => {
        this.isConnectLoading = false;
        this.router.navigateByUrl(`/chats/${c.id}`);
      },
      error: (err) => {
        console.log(err);
        this.isConnectLoading = false;
      },
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
