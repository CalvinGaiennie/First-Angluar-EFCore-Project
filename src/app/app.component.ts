import { Component } from '@angular/core';
import { CreateAccountComponent } from './create-account/create-account.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CreateAccountComponent],
})
export class AppComponent {}
