import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Entry } from "./model/entry";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PasswordEntriesService {

  constructor(private http: HttpClient) { }

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

}
