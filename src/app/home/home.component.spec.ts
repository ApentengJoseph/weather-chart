import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Mock routing
        HomeComponent
      ],
    }).compileComponents(); 

    fixture = TestBed.createComponent(HomeComponent); 
    component = fixture.componentInstance; 
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display forecast options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.options-header')?.textContent).toContain('Select a Forecast');
    expect(compiled.querySelectorAll('.forecast-option').length).toEqual(2); // Expect 2 forecast options
  });
});
