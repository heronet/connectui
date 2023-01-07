import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private connectedUsersSource = new ReplaySubject<string[]>();
  connectedUsers$ = this.connectedUsersSource.asObservable();

  constructor(private http: HttpClient) {}
  fetchUsers() {
    return this.http.get<User[]>(`${environment.baseUrl}/users`);
  }
  fetchConnectedUsers() {
    return this.http
      .get<User[]>(`${environment.baseUrl}/users/connected`)
      .pipe(map((users) => this.usersToIds(users)))
      .subscribe({ error: (err) => console.log(err) });
  }
  connectUser(id: string) {
    this.http
      .get<User[]>(`${environment.baseUrl}/users/connect/${id}`)
      .pipe(map((users) => this.usersToIds(users)))
      .subscribe({ error: (err) => console.log(err) });
  }
  private usersToIds(users: User[]) {
    console.log(users);
    let userIds = users.map((u) => u.id);
    this.connectedUsersSource.next(userIds);
  }
}
