import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Entry } from '../model/entry';
import { PasswordEntriesService } from '../password-entries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  entries: Entry[];
  showPassword: boolean[]; 

  constructor(public entriesSvc: PasswordEntriesService, public loginService: LoginService,
    private router: Router) { 
    this.entries = [];
    this.showPassword = [];
  }

  ngOnInit(): void {
    if (!this.loginService.loggedIn) {
      return;
    }
    this.updateData();
  }

  updateData(): void {
    if (!this.loginService.loggedIn) {
      return;
    }
    // This is equivalent to promise.then(), then do a GET
    this.entriesSvc.getEntries().subscribe( entries => {
      this.entries = entries
      this.showPassword = [];
      this.entries.forEach( e => {
        this.showPassword[e.id] = false;
      })
    })
  }

  showEntryPassword(id: number): boolean {
    if (this.showPassword[id] == null) {
      return false;
    }
    let val = this.showPassword[id];
    console.log('showEntryPassword '+id+' '+val);
    return val;
  }

  toggleShowEntryPassword(id: number): void {
    if (this.showPassword[id] == null) {
      return;
    }
    this.showPassword[id] = !this.showPassword[id];
    let val = this.showPassword[id];
    console.log('toggleShowEntryPassword '+id+' '+val);
  }

  editPasswordEntryForm(id?: number): void {
    let id2: string = '-1';
    if (id === undefined) {
      console.log('editPasswordEntryForm: ' + Number(-1));
    } else {
      console.log('editPasswordEntryForm: ' + id);
      id2 = String(id);
    }
    this.router.navigate(['/edit', id2]);
  }


}
