import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Listing } from './listing';
import { NewListing } from './newListing';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient) { }

  getListingById(id: String): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getListingById/${id}`);
  }

  getMyListings(): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/myListings/`);
  }

  getTradingListingsByCategory(id: String): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getTradingListingsByCategory/${id}`);
  }

  getSellingListingsByCategory(id: String): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getSellingListingsByCategory/${id}`);
  }

  getWantedListingsByCategory(id: String): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getWantedListingsByCategory/${id}`);
  }

  getAllWantedListings(): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getAllWantedListings/`);
  }

  getAllTradingListings(): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getAllTradingListings/`);
  }

  getAllSellingListings(): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getAllSellingListings/`);
  }

  createListing(newListing: NewListing): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}listing/createListing/`, newListing);
  }

  modifyListing(editedListing: Listing): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}listing/modifyListing/${editedListing._id}`, editedListing);
  }

  deleteListing(id: String): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}listing/deleteListing/${id}`);
  }

  promoteListing(id: String): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}listing/promoteListing/${id}`, null);
  }

  getAllPromotedListings(): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getAllPromotedListings/`);
  }

  getListingsByUserId(id: String): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getListingsByUserId/${id}`);
  }

}
