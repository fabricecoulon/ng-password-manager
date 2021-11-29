import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-error',
  templateUrl: './view-error.component.html',
  styleUrls: ['./view-error.component.css']
})
export class ViewErrorComponent implements OnInit {
  errorMessage: string = '';

  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    console.log('ViewErrorComponent : constructor : navigation', navigation);
    if (navigation !== null) {
      const state = navigation.extras.state as {errObj: string};
      if ( (state != null) && (state.hasOwnProperty('errObj')) ) {
        this.errorMessage = state.errObj;
        console.log('ViewErrorComponent : constructor : this.errorMessage', this.errorMessage);
      }
    }    
  }

  ngOnInit(): void {
  
  }

}
