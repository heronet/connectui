import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthDto } from '../auth/authdto';
import { Chat } from '../models/chat';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private signalRErrorSource = new Subject<Error>();
  signalRError$ = this.signalRErrorSource.asObservable();

  private signalrConnectedSource = new ReplaySubject<boolean>(1);
  signalrConnected$ = this.signalrConnectedSource.asObservable();

  private chatsSource = new Subject<Chat[]>();
  chats$ = this.chatsSource.asObservable();

  private chatSource = new Subject<Chat>();
  chat$ = this.chatSource.asObservable();

  private messageSource = new Subject<Message>();
  message$ = this.messageSource.asObservable();

  private BASE_URL = environment.baseUrl;
  connection: HubConnection | undefined;
  chats: Chat[] = [];

  constructor(private http: HttpClient) {}

  getChats() {
    return this.http.get<Chat[]>(`${this.BASE_URL}/chats`);
  }
  getChat(id: string) {
    return this.http.get<Chat>(`${this.BASE_URL}/chats/${id}`);
  }

  sendMessage(message: Partial<Message>) {
    this.connection?.invoke('SendMessage', message).catch((err: Error) => {
      console.log(err);
      this.signalRErrorSource.next(err);
    });
    console.log('Sent');
  }
  initSignalR(authDto: AuthDto) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.signalRUrl}/chat`, {
        accessTokenFactory: () => authDto.token,
      })
      .withAutomaticReconnect()
      .build();

    this.connection.start().catch((err) => {
      this.signalRErrorSource.next(err);
      console.log(err);
    });

    this.connection.on('connected', (userId) => {
      console.log(`${userId} Connected`);

      this.signalrConnectedSource.next(true);
    });
    this.connection.on('disconnected', (userId) => {
      console.log(`${userId} disconnected`);
      this.signalrConnectedSource.next(false);
    });
    this.connection.on('ReceivedChats', (chats: Chat[]) => {
      this.chats = chats;
      this.chatsSource.next(this.chats);
    });
    this.connection.on('ReceivedChat', (chat: Chat) => {
      this.chatSource.next(chat);
    });
    this.connection.on('ReceivedMessage', (message: Message) => {
      this.messageSource.next(message);
      console.log('Received');
    });
  }
  stopSignalR() {
    if (this.connection?.state === signalR.HubConnectionState.Connected)
      this.connection.stop().catch((err) => console.log(err));
  }
}
