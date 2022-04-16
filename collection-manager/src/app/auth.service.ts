import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import jwt_decode from 'jwt-decode';
import { User } from './User';
import { RegisterUser } from './RegisterUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public readToken(): User | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      return jwt_decode(token);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl+'auth/login', user);
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl+"auth/registerUser", registerUser)
  }

  clearToken(): void {
    localStorage.clear();
  }

  isAdministrator(): Observable<any> {
    return this.http.get<string>(environment.apiBaseUrl+"dev/checkRole");
  }

}
