import { Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: '**', redirectTo: '/login' },
];
