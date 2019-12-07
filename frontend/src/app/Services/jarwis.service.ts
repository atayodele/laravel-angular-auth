import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private url = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  signup(data){
    return this.http.post(`${this.url}/signup`, data);
  }

  login(e){
    return this.http.post(`${this.url}/login`, e);
  }

  //PASSWORD RESET
  sendPasswordResetLink(data){
    return this.http.post(`${this.url}/sendPasswordResetLink`, data);
  }

  changePassword(data){
    return this.http.post(`${this.url}/resetPassword`, data);
  }
}
