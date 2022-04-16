import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Template } from './Template';
import { Book } from './Book';
import { Comic } from './Comic';


@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  getTemplateById(id: String): Observable<any> {
    return this.http.get<Template>(`${environment.apiBaseUrl}template/getTemplateByItemId/${id}`);
  }

  addBookTemplate(id: string, book: Book): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}template/addTemplateToItem/${id}`, book);
  }

  addComicTemplate(id: string, comic: Comic): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}template/addTemplateToItem/${id}`, comic);
  }

}
