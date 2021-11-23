import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, User } from '../login.service';

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

    // Call the LoginService service from this component / subscribe to authenticate
    // the user and password
    this.loginService.getUser(this.loginService.username).subscribe(users => {
      if ((users !== null) && (users.length == 1)) {
        console.log(JSON.stringify(users[0]));
        let user = new User(users[0].username, users[0].hashpass);
        if (this.loginService.compareStringAgainstHash(this.loginService.password, user.hashpass)) {
          this.doLogin();
        } else {
          console.error('Login failed for user: ', this.loginService.username);
          // FIXME: add the reason and pass it to the error view page
          this.router.navigate(['/error']);
        }
      } else {
        console.error('Login failed: Unknown reason');
        // FIXME: add the reason and pass it to the error view page
        this.router.navigate(['/error']);
      }
    });

  }

  private doLogin() {
    // The server has authenticated the user
    this.loginService.loggedIn = true;
    // Generate the secret passphrase
    this.loginService.initSecret();
    this.router.navigate(['/home']);
  }

  logout() {
    this.loginService.loggedIn = false;
    this.router.navigate(['/login']);
  }

}
