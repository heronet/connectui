import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chat } from '../models/chat';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private BASE_URL = `${environment.baseUrl}/connections`;
  private connectedUsersSource = new ReplaySubject<string[]>();
  connectedUsers$ = this.connectedUsersSource.asObservable();

  constructor(private http: HttpClient) {}
  fetchUsers() {
    return this.http.get<User[]>(`${this.BASE_URL}`);
  }
  fetchConnectedUsers() {
    return this.http
      .get<User[]>(`${this.BASE_URL}/connected`)
      .pipe(map((users) => this.usersToIds(users)))
      .subscribe({ error: (err) => console.log(err) });
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
    this.http
      .patch<User[]>(`${this.BASE_URL}/connect`, { recipientId: id })
      .pipe(map((users) => this.usersToIds(users)))
      .subscribe({ error: (err) => console.log(err) });
  }
  private usersToIds(users: User[]) {
    let userIds = users.map((u) => u.id);
    this.connectedUsersSource.next(userIds);
  }
}
