import { Component, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements ErrorHandler {
  error: string | null = null;

  constructor(public authService: AuthService) {}

  handleError(error: any) {
    console.error('Application error:', error);
    this.error = 'An unexpected error occurred. Please try again later.';
  }
}
