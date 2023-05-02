import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //Bejelentkezes
  login(username: string, password: string) {
    return this.http.post('http://localhost:3000' + '/login', {username: username, password: password},
    {withCredentials: true,
    responseType: 'text', observe: 'response' as 'response'});
  }
}
