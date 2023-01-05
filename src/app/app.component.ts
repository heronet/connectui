import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/authdto';
import { ChatsService } from './chats/chats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private chatService: ChatsService
  ) {}

  ngOnInit(): void {
    this.plantAuthData();
  }
  plantAuthData() {
    let email = localStorage.getItem('email');
    let id = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    if (email && id && token) {
      let authDto: AuthDto = { email, id, token };
      this.authService.setData(authDto);
      this.chatService.initSignalR(authDto);
    }
  }
}
