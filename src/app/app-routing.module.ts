import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewPasswordEntryComponent } from './new-password-entry/new-password-entry.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // !!!patchMatch full means that the entire path must be an empty string to match otherwise it matches all paths
  { path: 'home', component: HomeComponent }, // path cannot start with a slash!!!
  { path: 'login', component: LoginComponent },
  { path: 'edit/:id', component: NewPasswordEntryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
