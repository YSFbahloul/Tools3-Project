import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-courier-dashboard',
  templateUrl: './courier-dashboard.component.html',
  styleUrls: ['./courier-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CourierDashboardComponent implements OnInit {
  orders: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAssignedOrders('DHL');
  }

  loadAssignedOrders(courierName: string): void {
    this.authService.getAssignedOrders(courierName).subscribe({
      next: (response) => this.orders = response.assigned_orders,
      error: (error) => console.error('Error fetching orders:', error)
    });
  }

  deliverOrder(orderId: number): void {
    this.authService.updateOrderStatusDelivered(orderId).subscribe({
      next: () => this.loadAssignedOrders('DHL'),
      error: (error) => console.error('Failed to deliver order:', error)
    });
  }

  transitOrder(orderId: number): void {
    this.authService.updateOrderStatusInTransit(orderId).subscribe({
      next: () => this.loadAssignedOrders('DHL'),
      error: (error) => console.error('Failed to transit order:', error)
    });
  }

  acceptOrder(orderId: number): void {
    this.authService.acceptOrder(orderId).subscribe({
      next: () => this.loadAssignedOrders('DHL'),
      error: (error) => console.error('Failed to accept order:', error)
    });
  }

  rejectOrder(orderId: number): void {
    this.authService.rejectOrder(orderId).subscribe({
      next: () => this.loadAssignedOrders('DHL'),
      error: (error) => console.error('Failed to reject order:', error)
    });
  }
  pickUpOrder(orderId: number): void {
    this.authService.updateOrderStatusPickedUp(orderId).subscribe({
      next: () => this.loadAssignedOrders('DHL'),
      error: (error) => console.error('Failed to pick up order:', error)
    });
  }
}
