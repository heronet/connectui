import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/authdto';
import { Chat } from '../models/chat';
import { ChatsService } from './chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit, OnDestroy {
  authSub = new Subscription();
  messageSub = new Subscription();
  isLoading = false;
  authData: AuthDto | undefined;

  chats: Chat[] = [];
  constructor(
    private chatsService: ChatsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getChats();
    this.authSub = this.authService.authData$.subscribe({
      next: (data) => (this.authData = data),
    });
    this.messageSub = this.chatsService.message$.subscribe({
      next: (message) => {
        this.chats.forEach((c) => {
          if (c.id === message.chatId) {
            c.lastMessage = message.text;
            c.lastMessageSender = message.senderName;
            c.lastMessageSenderId = message.userId;
          }
        });
      },
    });
  }
  getChats() {
    this.isLoading = true;
    this.chatsService.getChats().subscribe({
      next: (chats) => {
        this.chats = chats;
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
    this.messageSub.unsubscribe();
  }
}
