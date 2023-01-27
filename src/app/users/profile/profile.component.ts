import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private authSub = new Subscription();
  isLoading = false;
  isChatLoading = false;
  authData: AuthDto | undefined;
  user: User | undefined;
  connectedUsers: string[] = [];
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authSub = this.authService.authData$.subscribe({
      next: (data) => {
        this.authData = data;
      },
    });
    this.route.params.subscribe({
      next: (params) => this.getUserInfo(params['id']),
    });
    this.getConnectedUsers();
  }
  getUserInfo(id: string) {
    this.isLoading = true;
    this.usersService.getUserData(id).subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  connectUser() {
    this.isChatLoading = true;
    this.usersService.connectUser(this.user!.id).subscribe({
      next: (user) => {
        this.isChatLoading = false;
        this.connectedUsers.push(user.id);
      },
      error: (err) => {
        console.log(err);
        this.isChatLoading = false;
      },
    });
  }
  getConnectedUsers() {
    this.isChatLoading = true;
    this.usersService.fetchConnectedUsers().subscribe({
      next: (users) => {
        this.connectedUsers = users.map((u) => u.id);
        this.isChatLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isChatLoading = false;
      },
    });
  }
  isConnected() {
    return this.connectedUsers.includes(this.user?.id ?? '');
  }
  startChat() {
    this.isChatLoading = true;
    this.usersService.fetchOneToOneChatId(this.user!.id).subscribe({
      next: (c) => {
        this.isChatLoading = false;
        this.router.navigateByUrl(`/chats/${c.id}`);
      },
      error: (err) => {
        console.log(err);
        this.isChatLoading = false;
      },
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
