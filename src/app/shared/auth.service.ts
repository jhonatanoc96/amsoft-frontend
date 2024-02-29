import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user`);
  }
}