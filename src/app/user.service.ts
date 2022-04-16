import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from './UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserDetails(id: String): Observable<any> {
    return this.http.get<UserDetails>(`${environment.apiBaseUrl}user/getuserDetails/${id}`);
  }

  getMyDetails(): Observable<any> {
    return this.http.get<UserDetails>(`${environment.apiBaseUrl}user/getMyDetails/`);
  }

  editUserDetails(id: String, update: UserDetails): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}user/editUserDetails/${id}`, update);
  }

  findUser(name: String): Observable<any> {
    return this.http.get<UserDetails[]>(`${environment.apiBaseUrl}user/findUser/${name}`);
  }
  
}
