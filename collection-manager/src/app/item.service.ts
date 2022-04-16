import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './Item';
import { NewItem } from './newItem';
import { CustomField } from './CustomField';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItemById(id: String): Observable<any> { 
    return this.http.get<Item>(`${environment.apiBaseUrl}item/getItemById/${id}`);
  }
  
  getAllItemsByCollectionId(id: String): Observable<any> { 
    return this.http.get<Item[]>(`${environment.apiBaseUrl}item/getItemsByCollectionId/${id}`);
  }

  addItem(newItem: NewItem): Observable<any> { 
    return this.http.post<any>(`${environment.apiBaseUrl}item/addItem`, newItem);
  }
  
  editItem(editedItem: Item): Observable<any> { 
    return this.http.put<any>(`${environment.apiBaseUrl}item/editItem/${editedItem._id}`, editedItem);
  }

  addCustomField(id: String, customField: CustomField): Observable<any> { 
    return this.http.post<any>(`${environment.apiBaseUrl}item/addCustomField/${id}`, customField);
  }

  getCustomFields(id: String): Observable<any> { 
    return this.http.get<any>(`${environment.apiBaseUrl}item/getCustomFields/${id}`);
  }
    
  removeItem(id: String): Observable<any> { 
    return this.http.delete<any>(`${environment.apiBaseUrl}item/removeItem/${id}`);
  } 

  addImageToItem(id: String, image: any): Observable<any> { 
    console.log(image);
    return this.http.post<any>(`${environment.apiBaseUrl}image/addImageToItem/${id}`, image);
  } 

  getItemImages(id: String): Observable<any> { 
    return this.http.get<Item>(`${environment.apiBaseUrl}image/getItemImages/${id}`);
  }

  deleteImageFromItem(file: String): Observable<any> { 
    let bodyObj: any = {};
    bodyObj.filename = file;
    return this.http.delete<any>(`${environment.apiBaseUrl}item/removeItem`, {body: bodyObj});
  } 

}
