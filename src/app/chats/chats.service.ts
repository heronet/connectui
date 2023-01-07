import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthDto } from '../auth/authdto';
import { Chat } from '../models/chat';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  connection: HubConnection | undefined;

  private signalrConnectedSource = new ReplaySubject<boolean>(1);
  signalrConnected$ = this.signalrConnectedSource.asObservable();

  private chatsSource = new Subject<Chat[]>();
  chats$ = this.chatsSource.asObservable();

  private chatSource = new Subject<Chat>();
  chat$ = this.chatSource.asObservable();

  private messageSource = new Subject<Message>();
  message$ = this.messageSource.asObservable();

  chats: Chat[] = [];

  constructor() {}

  fetchChats() {
    this.connection?.invoke('GetChats').catch((err) => console.log(err));
  }
  fetchChat(id: string) {
    this.connection?.invoke('GetChat', id).catch((err) => console.log(err));
  }
  sendMessage(message: Partial<Message>) {
    this.connection
      ?.invoke('SendMessage', message)
      .catch((err) => console.log(err));
  }
  initSignalR(authDto: AuthDto) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.signalRUrl}/chat`, {
        accessTokenFactory: () => authDto.token,
      })
      .withAutomaticReconnect()
      .build();

    this.connection.start().catch((err) => {
      console.log(err);
    });

    this.connection.on('connected', (user) => {
      console.log(`${user} Connected`);
      this.signalrConnectedSource.next(true);
    });
    this.connection.on('disconnected', (user) => {
      console.log(`${user} disconnected`);
      this.signalrConnectedSource.next(false);
    });
    this.connection.on('ReceivedChats', (chats: Chat[]) => {
      this.chats = chats;
      this.chatsSource.next(this.chats);
    });
    this.connection.on('ReceivedChat', (chat: Chat) => {
      this.chats.push(chat);
      this.chatsSource.next(this.chats);
      this.chatSource.next(chat);
    });
    this.connection.on('ReceivedMessage', (message: Message) => {
      this.messageSource.next(message);
    });
  }
  stopSignalR() {
    this.connection?.stop().catch((err) => console.log(err));
  }
}
