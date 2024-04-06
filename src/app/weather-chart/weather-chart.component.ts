import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Chart, Tooltip, TooltipItem, ChartData, ChartOptions,registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class WeatherChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: Chart | undefined;

  constructor(private weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    // Fetch the route params and then fetch forecast data
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.weatherService.getForecast(id).subscribe((forecastData: { properties: { periods: any; }; }) => {
        const periods = forecastData.properties.periods;
        this.renderChart(periods);
      });
    });
  }

  renderChart(periods: any[]): void {
    var labels;
    if (this.chartCanvas?.nativeElement) {
      labels = periods.map(period => period.name);
      const temperatures = periods.map(period => period.temperature);


      const data: ChartData = {
        labels: labels,
        datasets: [{
          label: 'Temperature (°F)',
          data: temperatures,
          fill: false,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          tension: 0.4,
          borderWidth: 2,
          pointBackgroundColor: '#007bff',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#007bff',
        }]
      };

      const options: ChartOptions = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Temperature (°F)',
              color: '#333333', 
            },
            ticks: {
              color: '#666666',
            }
          },
          x: {
            title: {
              display: true,
              text: 'Forecast Period',
              color: '#333333', 
            },
            ticks: {
              color: '#666666',
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#007bff' 
            }
          },
          tooltip: {
            enabled: true, // Enable tooltips
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context: any) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += `${context.parsed.y}°F`;
                }
                return label;
              }
            },
            backgroundColor: 'rgba(0, 123, 255, 0.8)', // Custom background color for tooltips
            titleFont: { size: 16 },
            bodyFont: { size: 14 },
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            displayColors: false,
          }
        }
      };

      // If a chart instance already exists, destroy it before creating a new one
      if (this.chart) {
        this.chart.destroy();
      }
      const context = this.chartCanvas?.nativeElement.getContext('2d');
      if(context){
      this.chart = new Chart(context, {
        type: 'line',
        data: data,
        options: options
      });
      }

    }
  }
}
