import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = {
    login: `${environment.apiUrl}/login`,
    register: `${environment.apiUrl}/register`,
  };
  constructor(
    public router: Router,
  ) { }
  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken() {
    const token = this.getToken();
        
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  payload(token: any) {
    if (token.includes('.')) {
      const jwtPayload = token.split('.')[1]; ``
      return JSON.parse(atob(jwtPayload));
    } else {
      return false;
    }
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }
}