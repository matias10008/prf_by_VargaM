import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../utils/connection.service';
import { RegisterService } from '../utils/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string;
  password: string;
  email: string;

  constructor(private connectionService: ConnectionService, private router: Router, private registerService : RegisterService) {
    this.username = '';
    this.password = '';
    this.email = '';
  }

  register() {
    if (this.username != '' && this.password != '' && this.email != '') {
      this.registerService.register(this.username, this.password,this.email).subscribe(msg => {
        this.registerService.login(this.username, this.password).subscribe(message => {
          localStorage.setItem('username', this.username);
          this.router.navigate(['/products']);
        })});
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      localStorage.removeItem('username');
      this.connectionService.logout();
    }
  }
}
