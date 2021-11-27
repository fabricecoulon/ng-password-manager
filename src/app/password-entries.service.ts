import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Entry } from "./model/entry";
import { map } from "rxjs/operators";
import { LoginService } from './login.service';
import * as cryptojs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PasswordEntriesService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getEntries() {
    return this.http.get<Entry[]>('/api/entries').pipe(

      map(entries => {
        return entries.map( e => {
          e.date = new Date(e.date); // convert JSON date to JS Date
          return e;
        })
      }),
      map(entries => {
        return entries.sort(
          (a:Entry, b:Entry) => {
            if(a.date > b.date) {
              return 1;
            } else if (a.date.getTime() == b.date.getTime()) {
              return 0;
            } else {
              return -1
            }
          }
        )
      })

    ) // pipe()
  } // getEntries()

  public saveNewEntry(entry: Entry) {
    return this.http.post<Entry>('/api/entries', entry);
  }

  public changeEntry(entry: Entry) {
    return this.http.put<Entry>(`/api/entries/${entry.id}`, entry);    
  }

  public decryptPassword(aEncryptedPassword: string): string {
    console.log('HomeComponent : decryptPassword : aEncryptedPassword', aEncryptedPassword);
    let secret = this.loginService.getSecret();
    console.log('HomeComponent : decryptPassword : secret', secret);
    let decryptedPasswordBytes = cryptojs.AES.decrypt(aEncryptedPassword, secret);
    let decryptedPassword = decryptedPasswordBytes.toString(cryptojs.enc.Utf8);
    let decodedPassword = decodeURIComponent(atob(decryptedPassword));
    console.log('HomeComponent : decryptPassword : decodedPassword', decodedPassword);
    return decodedPassword;
  }

}
