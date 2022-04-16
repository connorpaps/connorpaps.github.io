import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from './Message';
import { Replies } from './Replies';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  getMessagesWithUser(id: String): Observable<any> {
    return this.http.get<Replies>(`${environment.apiBaseUrl}message/getMessagesWithUser/${id}`);
  }

  getConversationList(): Observable<any> {
    return this.http.get<Message>(`${environment.apiBaseUrl}message/getConversationList`);
  }

  addToConversation(id: String, message: String): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}message/addToConversation/${id}`, {body: message});
  }

  deleteConversation(id: String): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}message/deleteConversation/${id}`);
  }

  createConversation(id: String): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}message/createConversation/${id}`, {});
  }

}
