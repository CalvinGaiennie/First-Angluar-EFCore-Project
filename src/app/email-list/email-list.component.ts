import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Account {
  email: string;
  id: number;
  // Add other properties as needed
}

@Component({
  selector: 'app-email-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Registered Emails</h2>
      <div class="list-group">
        <div *ngFor="let account of accounts" class="list-group-item">
          {{ account.email }}
        </div>
      </div>
    </div>
  `,
})
export class EmailListComponent implements OnInit {
  accounts: Account[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEmails();
  }

  loadEmails() {
    this.http
      .get<Account[]>('http://localhost:5070/api/test/accounts')
      .subscribe({
        next: (data) => {
          this.accounts = data;
          console.log('Loaded accounts:', data);
        },
        error: (error) => {
          console.error('Error loading accounts:', error);
        },
      });
  }
}
