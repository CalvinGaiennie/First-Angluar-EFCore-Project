import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  { path: 'data', component: MainPageComponent },
  { path: '', redirectTo: '/data', pathMatch: 'full' },
  // ... other routes
];
