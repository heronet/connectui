import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent {
  isLoading = false;
  connectedUsers: User[] = [];
  connectedUsersSub = new Subscription();

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getConnectedUsers();
  }
  getConnectedUsers() {
    this.isLoading = true;
    this.userService.fetchConnectedUsers().subscribe({
      next: (users) => {
        this.connectedUsers = users;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
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
