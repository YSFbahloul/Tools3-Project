import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetOrderComponent } from './get-order.component';
import { OrderService } from '../services/order.service';
import { of } from 'rxjs';

describe('GetOrderComponent', () => {
  let component: GetOrderComponent;
  let fixture: ComponentFixture<GetOrderComponent>;
  let httpMock: HttpTestingController;
  let orderService: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GetOrderComponent],
      providers: [OrderService],
    }).compileComponents();

    fixture = TestBed.createComponent(GetOrderComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on init', () => {
    const mockOrders = [
      {
        order_id: 1,
        product_id: '1',
        delivery_address: 'address 1',
        status: 'pending',
      },
      {
        order_id: 2,
        product_id: '2',
        delivery_address: 'address 2',
        status: 'shipped',
      },
    ];

    spyOn(orderService, 'getMyOrders').and.returnValue(of({ orders: mockOrders }));

    component.ngOnInit();

    expect(component.orders.length).toBe(2);
    expect(component.orders[0].order_id).toBe(1);
    expect(component.orders[1].status).toBe('shipped');
  });

  it('should handle empty orders', () => {
    spyOn(orderService, 'getMyOrders').and.returnValue(of({ orders: [] }));

    component.ngOnInit();

    expect(component.orders.length).toBe(0);
    expect(component.message).toBe('No orders found.');
  });

  it('should handle error when fetching orders', () => {
    spyOn(orderService, 'getMyOrders').and.returnValue(of({ error: 'Failed' }));

    component.ngOnInit();

    expect(component.message).toBe('Failed to load orders.');
  });
});
