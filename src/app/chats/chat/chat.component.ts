import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  chat: Chat | undefined;
  chatSub = new Subscription();
  messageSub = new Subscription();
  signalRSub = new Subscription();

  constructor(
    private chatService: ChatsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chatSub = this.chatService.chat$.subscribe({
      next: (chat) => (this.chat = chat),
      error: (err) => console.log(err),
    });
    this.messageSub = this.chatService.message$.subscribe({
      next: (message) => {
        console.log('GOT MSG', message);
        if (message.chatId === this.chat?.id) {
          this.chat.messages.push(message);
        }
      },
      error: (err) => console.log(err),
    });
    this.signalRSub = this.chatService.signalrConnected$.subscribe({
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
  ngOnDestroy(): void {
    this.chatSub.unsubscribe();
    this.messageSub.unsubscribe();
    this.signalRSub.unsubscribe();
  }
}
