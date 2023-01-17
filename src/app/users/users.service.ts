import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Chat } from '../models/chat';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private BASE_URL = `${environment.baseUrl}/connections`;
  constructor(private http: HttpClient) {}
  fetchUsers() {
    return this.http.get<User[]>(`${this.BASE_URL}`);
  }
  fetchConnectedUsers() {
    return this.http.get<User[]>(`${this.BASE_URL}/connected`);
  }
  fetchOneToOneChatId(recipientId: string) {
    return this.http.get<Partial<Chat>>(
      `${this.BASE_URL}/connected/${recipientId}`
    );
  }
  renameChat(chatId: string, chatName: string) {
    return this.http.patch<Partial<Chat>>(`${this.BASE_URL}/rename`, {
      chatId,
      chatName,
    });
  }
  connectUser(id: string) {
    return this.http.post<User>(`${this.BASE_URL}/connect`, {
      recipientId: id,
    });
  }
}
