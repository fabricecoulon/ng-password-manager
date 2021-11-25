import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LoginService } from '../login.service';
import { Entry } from '../model/entry';
import { PasswordEntriesService } from '../password-entries.service';

type EntryFormModel = {
  date: string;
  url: string;
  username: string;
  password: string;
  passwordVerification: string;
}

@Component({
  selector: 'app-new-password-entry',
  templateUrl: './new-password-entry.component.html',
  styleUrls: ['./new-password-entry.component.css']
})
export class NewPasswordEntryComponent implements OnInit {

  @Output() create = new EventEmitter();
  
  model: EntryFormModel;
  id: number;
  currentEntry: Entry;
  showPasswords: boolean = false;
  passtype: string = 'password';
  btnShowText: string = 'Show';

  constructor(public loginSvc: LoginService,
    private _ActivatedRoute: ActivatedRoute,
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
    console.log('this.model = ' + this.model);
    console.log('this.id = ' + this.id);
    let newEntry: Entry = 
      Object.assign({}, this.model, 
        {
          id: this.id,
          date: new Date(this.model.date),
        }
      );
    console.log(JSON.stringify(newEntry));
    this.create.emit(newEntry);
  }

  toggleShowPasswords() {
    this.showPasswords = !this.showPasswords;
    this.passtype = (this.showPasswords)?'text':'password';
    this.btnShowText = (this.showPasswords)?'Hide':'Show';
    console.log('NewPasswordEntryComponent : toggleShowPasswords : this.passtype', this.passtype);
  }

}
