import { Component } from '@angular/core';
import { EmailListComponent } from './email-list/email-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmailListComponent, CreateAccountComponent, HttpClientModule],
  template: `
    <div class="container">
      <app-create-account></app-create-account>
      <app-email-list></app-email-list>
    </div>
  `,
})
export class AppComponent {}
