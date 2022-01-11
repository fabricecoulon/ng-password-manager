import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LoginService, User, JwtToken } from '../login.service';
import { parseJwt } from '../utils/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mouseOverLoginButton: boolean = false;

  constructor(public loginService: LoginService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.resetLocalStorageToken();
  }

  setSession(token: string): void {
    /* After decoding, you receive a standard https://jwt.io/ Jwt
    {
      "sub": "fabrice",
      "exp": 1639424949,
      "iat": 1639406949
    }
    */
    let jwttoken = parseJwt(token);
    console.log(jwttoken);
    const subject = jwttoken.sub; // whom the token refers to
    const expiresAt = moment().add(jwttoken.exp,'second');
    const issuedAt = moment().add(jwttoken.iat,'second');
    localStorage.setItem('id_token', token)
    localStorage.setItem('subject', subject);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('issued_at', JSON.stringify(issuedAt.valueOf()));
  
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

  login() {

    // https://blog.angular-university.io/angular-jwt-authentication/
    // Call authenticate and save the JwtToken
    this.loginService.authenticateUser().subscribe( res => this.setSession(res.token) )

  }

  private doLogin() {
    // The server has authenticated the user
    this.loginService.loggedIn = true;
    // Generate the secret passphrase
    this.loginService.initSecret();
    this.router.navigate(['/home']);
  }

  logout() {
    this.resetLocalStorageToken();    
    this.loginService.loggedIn = false;
    this.router.navigate(['/login']);
  }

  private resetLocalStorageToken() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("subject");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("issued_at");
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    let expiresAt = null;
    if (expiration != null) {
      expiresAt = JSON.parse(expiration);
    }
    return moment(expiresAt);    
  }    

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

}
