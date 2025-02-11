import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Orders',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http
      .get<{ labels: string[]; data: number[] }>('assets/output.json')
      .subscribe({
        next: (jsonData) => {
          console.log('Fetched Data:', jsonData); // Debugging

          if (jsonData.labels && jsonData.data) {
            this.barChartData.labels = jsonData.labels ?? []; // Ensure it's never undefined
            this.barChartData.datasets[0].data = jsonData.data ?? [];
          }
        },
        error: (err) => console.error('Error fetching data:', err),
      });
  }
}
