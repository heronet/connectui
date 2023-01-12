import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent {
  connectedUsers: User[] = [];
  connectedUsersSub = new Subscription();

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.connectedUsersSub = this.userService.connectedUsers$.subscribe({
      next: (users) => {
        this.connectedUsers = users;
      },
      error: (err) => console.log(err),
    });
    this.userService.fetchConnectedUsers();
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
