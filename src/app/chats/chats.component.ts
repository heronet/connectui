import { Component, OnInit } from '@angular/core';
import { Chat } from '../models/chat';
import { ChatsService } from './chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  chats: Chat[] = [];
  constructor(private chatService: ChatsService) {}
  ngOnInit(): void {
    this.chatService.chats$.subscribe({
      next: (chats) => (this.chats = chats),
      error: (err) => console.log(err),
    });
    this.chatService.signalrConnected$.subscribe({
      next: (signalrConnected) => {
        if (signalrConnected) {
          this.chatService.fetchChats();
        }
      },
    });
  }
}
