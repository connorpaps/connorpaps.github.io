import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Collection } from './Collection';
import { NewCollection } from './newCollection';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCollectionById(id: String): Observable<any> {
    return this.http.get<Collection>(
      `${environment.apiBaseUrl}collection/getCollectionById/${id}`
    );
  }

  getMyCollections(): Observable<any> {
    return this.http.get<Collection[]>(
      `${environment.apiBaseUrl}collection/getMyCollections/`
    );
  }

  createCollection(newCollection: NewCollection): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}collection/createCollection`,
      newCollection
    );
  }

  editCollection(editedCollection: Collection): Observable<any> {
    return this.http.put<any>(
      `${environment.apiBaseUrl}collection/editCollection/`,
      editedCollection
    );
  }

  removeCollection(id: String): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiBaseUrl}collection/removeCollection/${id}`
    );
  }
}
