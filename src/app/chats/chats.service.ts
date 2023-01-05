import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { AuthDto } from '../auth/authdto';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  connection: HubConnection | undefined;
  constructor(private http: HttpClient) {}
  fetchChats() {
    return this.http.get<Chat[]>(`${environment.baseUrl}/chat`);
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
    });
    this.connection.on('disconnected', (user) => {
      console.log(`${user} disconnected`);
    });
  }
  stopSignalR() {
    this.connection?.stop().catch((err) => console.log(err));
  }
}
