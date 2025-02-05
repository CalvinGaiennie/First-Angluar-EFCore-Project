import { Component, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <!-- existing nav content -->
    </nav>
    <div class="container">
      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent implements ErrorHandler {
  error: string | null = null;

  handleError(error: any) {
    console.error('Application error:', error);
    this.error = 'An unexpected error occurred. Please try again later.';
  }
}
