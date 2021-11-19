import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // !!!patchMatch full means that the entire path must be an empty string to match otherwise it matches all paths
  { path: 'home', component: HomeComponent } // path cannot start with a slash!!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
