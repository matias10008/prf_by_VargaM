import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../utils/connection.service';
import { LoginService } from '../utils/login.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  errorMessage: string | null = null;

  constructor(private connectionService: ConnectionService, private router: Router, private loginService : LoginService, private http: HttpClient) {
    this.username = '';
    this.password = '';
  }

  login() {
    if (this.username != '' && this.password != '') {
      this.loginService.login(this.username, this.password).subscribe(msg => {
        localStorage.setItem('username', this.username);
        if(this.username == "admin2"){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/products']);
        }
      });
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      localStorage.removeItem('username');
      this.connectionService.logout();
    }
  }
}
