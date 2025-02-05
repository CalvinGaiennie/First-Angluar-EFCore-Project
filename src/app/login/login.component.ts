import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login attempt:', this.loginForm.value);

      this.http
        .post('http://localhost:5070/api/test/login', this.loginForm.value)
        .subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            this.authService.login();
            this.router.navigate(['/main-page']);
          },
          error: (error) => {
            console.error('Login failed:', error);
            // Add error handling (e.g., show error message)
          },
        });
    }
  }
}
