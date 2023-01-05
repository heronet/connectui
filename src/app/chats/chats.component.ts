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
    this.chatService.fetchChats().subscribe({
      next: (res) => {
        this.chats = res;
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }
}
