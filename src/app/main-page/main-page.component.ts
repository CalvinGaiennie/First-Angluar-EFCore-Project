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
  public ordersByDateChart: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Orders by Date',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  public ordersByStatusChart: ChartConfiguration<'pie'>['data'] = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        borderWidth: 1,
      },
    ],
  };

  public mistakeTypesChart: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Types of Mistakes',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgb(255, 159, 64)',
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
      },
    },
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<any[]>('assets/output.json').subscribe({
      next: (orders) => {
        // Process orders by date
        const ordersByDate = orders.reduce((acc, order) => {
          const date = order.Date;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

        // Sort dates chronologically
        const sortedDates = Object.keys(ordersByDate).sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );

        this.ordersByDateChart.labels = sortedDates;
        this.ordersByDateChart.datasets[0].data = sortedDates.map(
          (date) => ordersByDate[date]
        );

        // Process orders by status
        const ordersByStatus = orders.reduce((acc, order) => {
          const status =
            order.OrderStatus === 'correct' ? 'Correct' : 'Incorrect';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

        this.ordersByStatusChart.datasets[0].data = [
          ordersByStatus['Correct'] || 0,
          ordersByStatus['Incorrect'] || 0,
        ];

        // Process mistake types
        const mistakeTypes = orders
          .filter(
            (order) => order.OrderStatus === 'incorrect' && order.mistakeType
          )
          .reduce((acc, order) => {
            acc[order.mistakeType] = (acc[order.mistakeType] || 0) + 1;
            return acc;
          }, {} as { [key: string]: number });

        this.mistakeTypesChart.labels = Object.keys(mistakeTypes);
        this.mistakeTypesChart.datasets[0].data = Object.values(mistakeTypes);

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }
}
