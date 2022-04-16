import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { DocumentData } from './documentData';
import { UserDetails } from './UserDetails';

@Injectable({
  providedIn: 'root',
})
export class DevService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  documentStats(): Observable<any> {
    return this.http.get<DocumentData[]>(`${environment.apiBaseUrl}dev/documentStats/`
    );
  }

  getListOfUsers(): Observable<any> {
    return this.http.get<UserDetails[]>(`${environment.apiBaseUrl}dev/getListOfUsers`
    );
  }
}
