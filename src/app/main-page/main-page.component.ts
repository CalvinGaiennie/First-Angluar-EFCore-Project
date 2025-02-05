import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { Order } from '../types/order';

Chart.register(...registerables);

interface ChartDataset {
  data: number[];
  label: string;
  backgroundColor: string;
  type: ChartType;
  yAxisID?: string;
}

interface CustomChartData {
  datasets: ChartDataset[];
  labels: string[];
}

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  public orderStatusChart: ChartData<'bar'> = {
    datasets: [
      {
        data: [],
        label: 'Correct Orders',
        backgroundColor: 'rgba(75,192,75,0.8)',
        type: 'bar',
      },
      {
        data: [],
        label: 'Incorrect Orders',
        backgroundColor: 'rgba(255,99,132,0.8)',
        type: 'bar',
      },
    ],
    labels: [],
  };

  public errorTypeChart: ChartData<'bar'> = {
    datasets: [
      {
        data: [],
        label: 'Error Count',
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        type: 'bar',
      },
    ],
    labels: [],
  };

  public checkerPerformanceChart: ChartData<'bar'> = {
    datasets: [
      {
        data: [],
        label: 'Orders Checked',
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        type: 'bar',
      },
    ],
    labels: [],
  };

  public checkerErrorCatchChart: ChartData<'bar'> = {
    datasets: [
      {
        data: [],
        label: 'Errors Caught',
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
        type: 'bar',
      },
    ],
    labels: [],
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  public isLoading = false;
  public error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.isLoading = true;
    this.error = null;

    this.http.get<Order[]>('assets/output.json').subscribe({
      next: (data) => {
        try {
          // Process error types
          const errorTypes = data
            .filter((order) => order.OrderStatus === 'incorrect')
            .reduce((acc, order) => {
              const type = order.mistakeType || 'Unspecified';
              acc[type] = (acc[type] || 0) + 1;
              return acc;
            }, {} as Record<string, number>);

          // Update error types chart
          this.errorTypeChart.labels = Object.keys(errorTypes);
          this.errorTypeChart.datasets[0].data = Object.values(errorTypes);

          // Process checker statistics
          const checkerStats = data.reduce((acc, order) => {
            const checker = order.OrderChecker || 'Unassigned';
            if (!acc[checker]) {
              acc[checker] = { total: 0, errors: 0 };
            }
            acc[checker].total++;
            if (order.OrderStatus === 'incorrect') {
              acc[checker].errors++;
            }
            return acc;
          }, {} as Record<string, { total: number; errors: number }>);

          // Update checker performance charts
          const checkers = Object.keys(checkerStats);
          this.checkerPerformanceChart.labels = checkers;
          this.checkerPerformanceChart.datasets[0].data = checkers.map(
            (checker) => checkerStats[checker].total
          );

          this.checkerErrorCatchChart.labels = checkers;
          this.checkerErrorCatchChart.datasets[0].data = checkers.map(
            (checker) => checkerStats[checker].errors
          );

          // Process order status data
          const orderStatusData = data.reduce(
            (acc, order) => {
              order.OrderStatus === 'correct' ? acc.correct++ : acc.incorrect++;
              return acc;
            },
            { correct: 0, incorrect: 0 }
          );

          // Update order status chart
          this.orderStatusChart.labels = ['Order Status'];
          this.orderStatusChart.datasets[0].data = [orderStatusData.correct];
          this.orderStatusChart.datasets[1].data = [orderStatusData.incorrect];

          this.isLoading = false;
        } catch (err) {
          this.error = 'Error processing data';
          this.isLoading = false;
          console.error('Error processing data:', err);
        }
      },
      error: (err) => {
        this.error = 'Error loading data';
        this.isLoading = false;
        console.error('Error loading data:', err);
      },
    });
  }
}

export { MainPageComponent };
