import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService,
    private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  login() {
    this.loginService.loggedIn = true;
    this.router.navigate(['/home']);
  }

  logout() {
    this.loginService.loggedIn = false;
    this.router.navigate(['/login']);
  }

}
