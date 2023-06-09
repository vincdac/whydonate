import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private apiUrl = 'https://api.tvmaze.com/';

  constructor(private http: HttpClient) { }
  searchTVShows(title: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}?title=${encodeURIComponent(title)}`;
    return this.http.get(url, { headers });
  }
}
