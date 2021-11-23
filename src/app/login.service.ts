import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';  // npm i --save-dev @types/bcryptjs
import { map, filter } from "rxjs/operators";
import * as cryptojs from 'crypto-js';

export class User {
  constructor(public username: string, public hashpass: string) {}
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public username: string = '';
  public password: string = '';
  //public passhash: string = '';
  private secretPassPhrase: string = '';
  public loggedIn: boolean = false;
  constructor(private http: HttpClient) {

  }

  /*public hashPassword(): void {
    if (this.username == null) {
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    this.passhash = bcrypt.hashSync(this.password, salt);
    console.log('bcryptPassword: ', this.passhash);
  }*/

  private fixedEncodeURIComponent(astr: string): string {
    return encodeURIComponent(astr).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }

  public initSecret() {
    // We need to have a secret passphrase that is at least 32 bytes long
    this.secretPassPhrase = this.fixedEncodeURIComponent(this.password) + this.fixedEncodeURIComponent(this.username);
    this.secretPassPhrase = btoa(this.secretPassPhrase);
    console.log('LoginService : initSecret : secretPassPhrase', this.secretPassPhrase);
    /* https://stackoverflow.com/questions/64797987/what-is-the-default-aes-config-in-crypto-js 
      CryptoJS.AES.encrypt("Message", "Secret Passphrase");
      Now CryptoJs derives a 32 byte long encryption key for AES-256 and a 16 byte long initialization vector (iv) 
      from the "secret passphrase", encrypts the "Message" using this key, iv in AES mode CBC and (default) padding Pkcs7.    
    */
  }

  public getSecret() {
    return this.secretPassPhrase;
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
