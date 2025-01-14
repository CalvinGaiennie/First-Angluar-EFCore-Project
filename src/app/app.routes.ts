import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservation', component: ReservationFormComponent },
  { path: 'reservation/:id', component: ReservationFormComponent },
];
