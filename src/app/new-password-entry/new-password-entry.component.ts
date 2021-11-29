import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';
import { LoginService } from '../login.service';
import { Entry } from '../model/entry';
import { PasswordEntriesService } from '../password-entries.service';

type EntryFormModel = {
  date: string;
  url: string;
  username: string;
  password: string;
  passwordVerification?: string;
}

@Component({
  selector: 'app-new-password-entry',
  templateUrl: './new-password-entry.component.html',
  styleUrls: ['./new-password-entry.component.css']
})
export class NewPasswordEntryComponent implements OnInit, CanComponentDeactivate {
  
  model: EntryFormModel;
  id: number;
  currentEntry: Entry;
  showPasswords: boolean = false;
  passtype: string = 'password';
  btnShowText: string = 'Show';
  isChanged: boolean = false;
  isNewEntry: boolean = false;

  constructor(public loginSvc: LoginService,
    private _ActivatedRoute: ActivatedRoute,
    private router: Router,
    private entrySvc: PasswordEntriesService) {
    this.id = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    this.model = {
      date: '',
      url: '',
      username: '',
      password: '',
      passwordVerification: ''
    }
    this.currentEntry = new Entry();
  }

  ngOnInit(): void {
    this.resetForm();
    if (!this.loginSvc.loggedIn) {
      return;
    }
    if (this.id !== -1) {
      this.entrySvc.getEntries().subscribe(entries => {
        this.currentEntry = entries.filter( e => (e.id == this.id) )[0];
        console.log('this.currentEntry = ' + JSON.stringify(this.currentEntry));
        this.populateForm(this.id);
      });
    } else /*this.id === -1*/ {
      // get the new id for this new entry
      let maxId = -1;
      this.entrySvc.getEntries().subscribe(entries => {
        entries.reduce((p, c) => {
          maxId = Math.max(p, c.id);
          return maxId;
        },0);
        console.log('NewPasswordEntryComponent : maxId', maxId);
        this.isNewEntry = true;
        this.currentEntry = new Entry();
        this.currentEntry.id = maxId + 1;
        this.populateForm(this.currentEntry.id);
      });
    }
  }

  resetForm() {
    this.model = {
      date: '',
      url: '',
      username: '',
      password: '',
      passwordVerification: ''
    }
    this.isChanged = false;
    this.showPasswords = false;
    this.passtype = 'password';
    this.btnShowText = 'Show';
    this.isNewEntry = false; 
  }

  populateForm(id: Number): void {
    if (this.currentEntry.id !== id) {
      return;
    } 
    this.model.date = this.currentEntry.date.toLocaleDateString();
    this.model.url = this.currentEntry.url;
    this.model.username = this.currentEntry.username;
    this.model.password = this.entrySvc.decryptPassword(this.currentEntry.password);
    this.model.passwordVerification = this.model.password;
  }

  createOrEditEntry() {
  
    // Read data from the model
    // 1. Validate that the password and passwordVerification fields match
    if (this.model.hasOwnProperty('passwordVerification') ) {
      if (!(this.model.password === this.model.passwordVerification)) {
        window.alert('The passwords (password and password verification) do not match');
        return;
      }
      delete this.model.passwordVerification;
    } else {
      window.alert('Could not verify passwords');
      return;
    }
    let newOrChangedEntry: Entry = 
      Object.assign({}, this.model, 
        {
          id: this.currentEntry.id,
          date: new Date(this.model.date),
          password: this.entrySvc.encryptPassword(this.model.password)
        }
      );
    console.log(JSON.stringify(newOrChangedEntry));
    if (this.isNewEntry) {
      const saveNewEntry$ = this.entrySvc.saveNewEntry(newOrChangedEntry);
      saveNewEntry$.subscribe( data => this.router.navigate(['/home']) );
    } else {
      const changeEntry$ = this.entrySvc.changeEntry(newOrChangedEntry);
      changeEntry$.subscribe( data => this.router.navigate(['/home']) );
    }
    // Reset the form
    this.resetForm();
  }

  toggleShowPasswords() {
    this.showPasswords = !this.showPasswords;
    this.passtype = (this.showPasswords)?'text':'password';
    this.btnShowText = (this.showPasswords)?'Hide':'Show';
    console.log('NewPasswordEntryComponent : toggleShowPasswords : this.passtype', this.passtype);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.isChanged) {
      const result = window.confirm('There are unsaved changes! Are you sure?');
      return of(result);
    }
    return true;    
  }

  public changeHandler(event: Event) {
    console.log('NewPasswordEntryComponent : changeHandler : event', event);
    this.isChanged = true;
  }

}
