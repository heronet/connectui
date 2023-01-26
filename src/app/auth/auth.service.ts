import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatsService } from '../chats/chats.service';
import { User } from '../models/user';
import { AuthDto, LoginDto, RegisterDto } from './authdto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authDataSource = new ReplaySubject<AuthDto | undefined>(1);
  authData$ = this.authDataSource.asObservable();

  constructor(
    private http: HttpClient,
    private chatService: ChatsService,
    private router: Router
  ) {}
  login(data: LoginDto) {
    return this.http
      .post<AuthDto>(`${environment.baseUrl}/account/login`, data)
      .pipe(
        map((authData) => {
          if (authData) {
            this.setData(authData);
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
          }
        })
      );
  }
  setData(authDto: AuthDto | undefined) {
    if (authDto) {
      localStorage.setItem('email', authDto.email);
      localStorage.setItem('id', authDto.id);
      localStorage.setItem('token', authDto.token);
      if (authDto.userAvatarUrl)
        localStorage.setItem('userAvatarUrl', authDto.userAvatarUrl);
      this.authDataSource.next(authDto);
      this.chatService.initSignalR(authDto);
    } else this.authDataSource.next(undefined);
  }
  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('userAvatarUrl');
    this.authDataSource.next(undefined);
    this.chatService.stopSignalR();
  }
  updateAvatar(user: Partial<User>) {
    localStorage.setItem('userAvatarUrl', user.avatar!.imageUrl);
    let email = localStorage.getItem('email')!;
    let id = localStorage.getItem('id')!;
    let token = localStorage.getItem('token')!;
    let userAvatarUrl = localStorage.getItem('userAvatarUrl')!;
    let authDto: AuthDto = { email, id, token, userAvatarUrl };
    this.authDataSource.next(authDto);
    this.router.navigateByUrl('/');
  }
}
