import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './Item';
import { Storage } from './Storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  getStorageById(id: String): Observable<any> {
    return this.http.get<Storage>(`${environment.apiBaseUrl}storage/getStorageDetails/${id}`);
  }

  getItemsInStorageByCode(id: string): Observable<any> {
    return this.http.get<Item[]>(`${environment.apiBaseUrl}storage/getItemsInStorageByCode/${id}`);
  }

  getStorageByUserId(): Observable<any> {
    return this.http.get<Storage[]>(`${environment.apiBaseUrl}storage/getStorageByUserId/`);
  }

  createStorage(newStorage: Storage): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}storage/createStorage`, newStorage);
  }

  editStorageDetails(storageEdit: Storage): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}storage/editStorageDetails`, storageEdit);
  }

  addItemToStorage(storageId: String, itemId: String): Observable<any> {
    let request = {
      "storage_object_id": storageId,
      "item_id": itemId
    }
    return this.http.post<any>(`${environment.apiBaseUrl}storage/addItemToStorage`, request);
  }

  removeItemFromStorage(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}storage/removeItemFromStorage/${id}`);
  }

  transferItemToADifferentStorage(storageId: string, itemId): Observable<any> {
    let request = {
      "storage_object_id": storageId,
      "item_id": itemId
    }
    return this.http.put<any>(`${environment.apiBaseUrl}storage/removeItemFromStorage/`, request);
  }

  removeStorageLocation(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}storage/removeStorageLocation/${id}`)
  }

}
