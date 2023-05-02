import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(
    private http: HttpClient) {}
    //Kijelentkezes
    logout() {
      return this.http.post('http://localhost:3000' + '/logout',{},
      {withCredentials: true, responseType: 'text'});
    }
}
