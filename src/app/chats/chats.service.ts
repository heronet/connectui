import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  connection: HubConnection | undefined;
  token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') ?? '';
    this.initSignalR();
  }
  fetchChats() {
    return this.http.get<Chat[]>(`${environment.baseUrl}/chat`);
  }

  initSignalR() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.signalRUrl}`, {
        accessTokenFactory: () => this.token,
      })
      .build();
    this.connection.start();
    this.connection.on('connected', () => {
      console.log('Connected');
    });
  }
}
