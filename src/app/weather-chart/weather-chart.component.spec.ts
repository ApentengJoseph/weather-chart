import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherChartComponent } from './weather-chart.component';
import { WeatherService } from '../weather.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Mock WeatherService with necessary methods and return values
class MockWeatherService {
  getForecast(id: string) {
    return of({ properties: { periods: [{ name: 'Day', temperature: 25 }] } });
  }
}

describe('WeatherChartComponent', () => {
  let component: WeatherChartComponent;
  let fixture: ComponentFixture<WeatherChartComponent>;
  let mockWeatherService: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        WeatherChartComponent // Import the standalone component directly
      ],
      providers: [
        { provide: WeatherService, useClass: MockWeatherService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherChartComponent);
    component = fixture.componentInstance;
    mockWeatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch forecast data and render chart on init', (done) => {
    const mockForecastData = { properties: { periods: [{ name: 'Day 1', temperature: 20 }, { name: 'Day 2', temperature: 22 }] } };
    spyOn(mockWeatherService, 'getForecast').and.returnValue(of(mockForecastData));
    const renderChartSpy = spyOn(component, 'renderChart').and.callThrough();
  
    component.ngAfterViewInit(); // Since data fetch is triggered here
  
    fixture.whenStable().then(() => {
      expect(mockWeatherService.getForecast).toHaveBeenCalled();
      expect(renderChartSpy).toHaveBeenCalledWith(mockForecastData.properties.periods);
      done();
    });
  });  
  });
