import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { authDto, loginDto } from './authdto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(data: loginDto) {
    return this.http.post<authDto>(
      `${environment.baseUrl}/account/login`,
      data
    );
  }
  setData(authDto: authDto) {
    localStorage.setItem('email', authDto.email);
    localStorage.setItem('id', authDto.id);
    localStorage.setItem('token', authDto.token);
  }
}
