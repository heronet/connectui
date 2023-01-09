import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  connectedUserIds: string[] = [];
  connectedUsersSub = new Subscription();

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.connectedUsersSub = this.userService.connectedUsers$.subscribe({
      next: (users) => (this.connectedUserIds = users),
      error: (err) => console.log(err),
    });
    this.userService.fetchUsers().subscribe({
      next: (u) => (this.users = u),
      error: (err) => console.log(err),
    });
    this.userService.fetchConnectedUsers();
  }
  connectUser(user: User) {
    this.userService.connectUser(user.id);
  }
  isConnected(user: User) {
    return this.connectedUserIds.includes(user.id);
  }
  startChat(user: User) {
    this.userService.fetchOneToOneChatId(user.id).subscribe({
      next: (c) => {
        this.router.navigateByUrl(`/chats/${c.id}`);
      },
      error: (err) => console.log(err),
    });
  }
  ngOnDestroy(): void {
    this.connectedUsersSub.unsubscribe();
  }
}
