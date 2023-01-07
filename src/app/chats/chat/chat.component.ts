import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chat: Chat | undefined;

  constructor(
    private chatService: ChatsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chatService.chat$.subscribe({
      next: (chat) => (this.chat = chat),
      error: (err) => console.log(err),
    });
    this.chatService.message$.subscribe({
      next: (message) => {
        if (message.chatId === this.chat?.id) {
          this.chat.messages.push(message);
        }
        console.log(message);
      },
      error: (err) => console.log(err),
    });
    this.chatService.signalrConnected$.subscribe({
      next: (signalrConnected) => {
        if (signalrConnected)
          this.chatService.fetchChat(this.route.snapshot.params['id']);
      },
    });
  }
  sendMessage({ value: { messageText } }: NgForm) {
    const message: Partial<Message> = {
      chatId: this.chat?.id ?? '',
      text: messageText,
    };
    this.chatService.sendMessage(message);
  }
}
