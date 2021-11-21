import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { Entry } from '../model/entry';
import { PasswordEntriesService } from '../password-entries.service';

type EntryFormModel = {
  date: string;
  url: string;
  username: string;
  password: string
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

  constructor(public loginSvc: LoginService,
    private _ActivatedRoute: ActivatedRoute,
    private entrySvc: PasswordEntriesService) {
    this.id = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    this.model = {
      date: '',
      url: '',
      username: '',
      password: ''
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
    }
  }

  resetForm() {
    this.model = {
      date: '',
      url: '',
      username: '',
      password: ''
    }
  }

  populateForm(id: Number): void {
    if (this.currentEntry.id !== id) {
      return;
    } 
    this.model.date = this.currentEntry.date.toLocaleDateString();
    this.model.url = this.currentEntry.url;
    this.model.username = this.currentEntry.username;
    this.model.password = this.currentEntry.password;
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

}
