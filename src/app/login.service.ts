import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public username: string = '';
  public password: string = '';
  public loggedIn: boolean = false;
  constructor() { }
}
