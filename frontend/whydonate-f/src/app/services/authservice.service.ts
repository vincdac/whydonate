import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = '/api/login'; // Replace with your actual API endpoint
  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl, { username, password });
  }
}
