import { Component, OnInit } from '@angular/core';
import { Entry } from '../model/entry';
import { PasswordEntriesService } from '../password-entries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  entries: Entry[]; 

  constructor(public entriesSvc: PasswordEntriesService) { 
    this.entries = [];
  }

  ngOnInit(): void {
    this.updateData();
  }

  updateData() {
    // This is equivalent to promise.then(), then do a GET
    this.entriesSvc.getEntries().subscribe( entries => {
      this.entries = entries
    })
  }

}
