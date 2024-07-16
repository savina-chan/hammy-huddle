import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-register-buttons',
  templateUrl: './login-register-buttons.component.html',
  styleUrl: './login-register-buttons.component.scss'
})
export class LoginRegisterButtonsComponent implements OnInit{

  constructor(private apiService: ApiService){}

  user: string = ""
  loggedIn:boolean = false;

  ngOnInit(): void {
    this.status()
  }

  status(): void {
    const result = this.apiService.checkLogInStatus()
    if(result[1]) {
      this.user = result[0];
      this.loggedIn = result[1];
    }
  }

}
