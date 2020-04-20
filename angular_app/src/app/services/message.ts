import { Injectable } from '@angular/core';
import { User } from './../interfaces/user-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_LIST, API_LIST, CONSTANTS } from '../url'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private httpClient: HttpClient, private http: HttpClient) { }

  authHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+sessionStorage.getItem(CONSTANTS.auth_token)
    });
    let options = { headers: headers };
    return options;
  }


  send(message,chatid): Observable<Object> {
    return this.httpClient.post(SERVER_LIST.django + API_LIST.message + chatid+"/messages/" ,message, this.authHeaders())
  }

}
