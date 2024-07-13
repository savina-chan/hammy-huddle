import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { supervisor } from '../supervisor.service';
import { Login } from '../login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor( private apiService: ApiService, private router: Router) {}

  failedLogin = false;

  get email() {
    return this.formLogin.get('email');
  }

  get password() {
    return this.formLogin.get('password');
  }

  getEmail() {
    return this.formLogin.get('email')?.value || '';
  }

  getPassword() {
    return this.formLogin.get('password')?.value || '';
  }

  postToDB(event: Event){

    event.preventDefault();

    const payload = {
      email: this.getEmail(),
      password: this.getPassword()
    };
      
    this.apiService.sendLogin(payload)
      .subscribe((response: Login) => {       
        // Set token expiry to 1 Day => Require Re-login
        supervisor.setItem('username', response.username, 1440);
        supervisor.setItem('token', response.accessToken, 1440);
        this.router.navigate(['/']);
      }, error => {
        this.failedLogin = true;
    });
  }
}   
