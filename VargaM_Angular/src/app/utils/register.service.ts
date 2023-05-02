import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  //Regisztracio
  register(username: string, password: string, email: string){
    return this.http.post('http://localhost:3000' + '/register', {username: username, password: password, email: email},
    {withCredentials: true,
    responseType: 'text', observe: 'response' as 'response'});
  }
    //Bejelentkezes
    login(username: string, password: string) {
      return this.http.post('http://localhost:3000' + '/login', {username: username, password: password},
      {withCredentials: true,
      responseType: 'text', observe: 'response' as 'response'});
    }
}
