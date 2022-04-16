import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from './Article';
import { NewArticle } from './newArticle';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticleDetails(id: String): Observable<any> { 
    return this.http.get<Article>(`${environment.apiBaseUrl}article/getArticleDetails/${id}`);
  }

  getListOfArticles(): Observable<any> { 
    return this.http.get<Article>(`${environment.apiBaseUrl}article/getListOfArticles`);
  }

  createArticle(article: NewArticle): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}article/createArticle`, article);
  }

  editArticlePost(editedArticle: Article, id: String): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}article/createArticle/${id}`, editedArticle);
  }

  deleteArticlePost(id: String): Observable<any> {
    return this.http.delete<Article>(`${environment.apiBaseUrl}article/deleteArticlePost/${id}`);
  }

}
