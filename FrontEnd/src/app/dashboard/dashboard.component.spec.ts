import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]), // Mock routing module for testing
        CommonModule // Necessary for using Angular directives like ngIf
      ],
      declarations: [DashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "View My Orders" button', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('View My Orders');
  });

  it('should navigate to order details when the button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Spy on router's navigate method

    const button = fixture.debugElement.query(By.css('button')); // Find the button
    button.nativeElement.click(); // Simulate a button click

    // Verify the navigation occurred with the correct route and order ID (assuming order ID is 1 here)
    expect(navigateSpy).toHaveBeenCalledWith(['/order-details', 1]);
  });
});
