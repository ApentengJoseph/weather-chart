import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service'; // Adjust the path as necessary

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch forecast data', () => {
    const mockResponse = {
      // mock response
    };

    const gridpointId = 'TOP';

    service.getForecast(gridpointId).subscribe((data:any) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`https://api.weather.gov/gridpoints/${gridpointId}/31,80/forecast`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse); // Simulate a response
  });
});
