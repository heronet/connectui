import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from '../models/chat';
import { ChatsService } from './chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit, OnDestroy {
  messageSub = new Subscription();
  isLoading = false;

  chats: Chat[] = [];
  constructor(private chatsService: ChatsService) {}

  ngOnInit(): void {
    this.getChats();

    this.messageSub = this.chatsService.message$.subscribe({
      next: (message) => {
        this.chats.forEach((c) => {
          if (c.id === message.chatId) {
            c.lastMessage = message.text;
            c.LastMessageSender = message.senderName;
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
    this.messageSub.unsubscribe();
  }
}
