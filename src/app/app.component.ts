import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/authdto';
import { ChatsService } from './chats/chats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private chatsSub = new Subscription();
  constructor(
    private authService: AuthService,
    private chatsService: ChatsService
  ) {}

  ngOnInit(): void {
    this.chatsSub = this.chatsService.signalRError$.subscribe({
      next: (err) => {
        if (err.message.includes('401')) this.authService.logout();
      },
    });
    this.plantAuthData();
  }
  plantAuthData() {
    let email = localStorage.getItem('email');
    let id = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    if (email && id && token) {
      let authDto: AuthDto = { email, id, token };
      this.authService.setData(authDto);
      // this.chatsService.initSignalR(authDto);
    } else {
      this.authService.setData(undefined);
    }
  }
  ngOnDestroy(): void {
    this.chatsSub.unsubscribe();
  }
}
