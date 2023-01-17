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
  chatsSub = new Subscription();
  signalRSub = new Subscription();

  chats: Chat[] = [];
  constructor(private chatService: ChatsService) {}

  ngOnInit(): void {
    this.chatsSub = this.chatService.chats$.subscribe({
      next: (chats) => (this.chats = chats.filter((c) => c.lastMessage)),
      error: (err) => console.log(err),
    });
    this.signalRSub = this.chatService.signalrConnected$.subscribe({
      next: (signalrConnected) => {
        if (signalrConnected) {
          this.chatService.fetchChats();
        }
      },
    });
  }
  ngOnDestroy(): void {
    this.chatsSub.unsubscribe();
    this.signalRSub.unsubscribe();
  }
}
