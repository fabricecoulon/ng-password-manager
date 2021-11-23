import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';  // npm i --save-dev @types/bcryptjs
import { map, filter } from "rxjs/operators";

export class User {
  constructor(public username: string, public hashpass: string) {}
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public username: string = '';
  public password: string = '';
  public passhash: string = '';
  public loggedIn: boolean = false;
  constructor(private http: HttpClient) {

  }

  public hashPassword(): void {
    if (this.username == null) {
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    this.passhash = bcrypt.hashSync(this.password, salt);
    console.log('bcryptPassword: ', this.passhash);
  }

  public compareStringAgainstHash(aplaintext: string, ahash: string): boolean {
    return bcrypt.compareSync(aplaintext, ahash);
  }

  public getUser(username: string) {
    return this.http.get<User[]>('/api/users').pipe(
      map(users => users.filter(u => u.username == username))
    )
  }

}
