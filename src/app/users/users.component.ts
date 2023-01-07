import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../chats/chats.service';
import { Chat } from '../models/chat';
import { User } from '../models/user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  connectedUserIds: string[] = [];

  constructor(private userService: UsersService) {}
  ngOnInit(): void {
    this.userService.connectedUsers$.subscribe({
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
}
