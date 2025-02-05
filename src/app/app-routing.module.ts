import { Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EmailListComponent } from './email-list/email-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'email-list', component: EmailListComponent },
  {
    path: 'main-page',
    component: MainPageComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];
