import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatsService } from '../chats/chats.service';
import { AuthDto, LoginDto, RegisterDto } from './authdto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authDataSource = new ReplaySubject<AuthDto | undefined>(1);
  authData$ = this.authDataSource.asObservable();

  constructor(private http: HttpClient, private chatService: ChatsService) {}
  login(data: LoginDto) {
    return this.http
      .post<AuthDto>(`${environment.baseUrl}/account/login`, data)
      .pipe(
        map((authData) => {
          if (authData) {
            this.setData(authData);
            this.chatService.initSignalR(authData);
          }
        })
      );
  }
  register(data: RegisterDto) {
    return this.http
      .post<AuthDto>(`${environment.baseUrl}/account/register`, data)
      .pipe(
        map((authData) => {
          if (authData) {
            this.setData(authData);
            this.chatService.initSignalR(authData);
          }
        })
      );
  }
  setData(authDto: AuthDto | undefined) {
    if (authDto) {
      localStorage.setItem('email', authDto.email);
      localStorage.setItem('id', authDto.id);
      localStorage.setItem('token', authDto.token);
      this.authDataSource.next(authDto);
    } else this.authDataSource.next(undefined);
  }
  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.authDataSource.next(undefined);
    this.chatService.stopSignalR();
  }
}
