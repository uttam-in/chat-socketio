import { Injectable } from '@angular/core';
import { User } from './../interfaces/user-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_LIST, API_LIST, CONSTANTS } from '../url'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private http: HttpClient) { }

  authHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+sessionStorage.getItem(CONSTANTS.auth_token)
    });
    let options = { headers: headers };
    return options;
  }

  LoginHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return options;
  }

  login(userInfo: User): Observable<Object> {
    sessionStorage.setItem("username", userInfo.username);
    return this.httpClient.post(SERVER_LIST.django + API_LIST.auth, userInfo, this.LoginHeaders())
  }

  getchatid(userInfo: User): Observable<Object> {
    return this.httpClient.post(SERVER_LIST.django + API_LIST.getchatid,userInfo, this.authHeaders())
  }

  public isLoggedIn() {
    return sessionStorage.getItem(CONSTANTS.auth_token) !== null;
  }
  public logout() {
    sessionStorage.clear()
  }
}
