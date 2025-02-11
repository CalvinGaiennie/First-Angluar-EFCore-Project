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
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Orders',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<any[]>('assets/output.json').subscribe({
      next: (orders) => {
        // Group orders by date and count them
        const ordersByDate = orders.reduce((acc, order) => {
          const date = order.Date;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        // Transform data for the chart
        this.barChartData.labels = Object.keys(ordersByDate);
        this.barChartData.datasets[0].data = Object.values(ordersByDate);

        // Force change detection
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }
}
