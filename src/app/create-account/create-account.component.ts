import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent {
  createAccountForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.createAccountForm.valid) {
      console.log('Form submitted:', this.createAccountForm.value);

      this.http
        .post(
          'http://localhost:5070/api/test/create-account',
          this.createAccountForm.value
        )
        .subscribe({
          next: (response) => {
            console.log('Success:', response);
            // Add success handling (e.g., show success message, redirect)
          },
          error: (error) => {
            console.error('Error:', error);
            // Add error handling (e.g., show error message)
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
