import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'weather/:id', component: WeatherChartComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
