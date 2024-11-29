import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service'; // Ensure this service is correctly implemented
import { HttpClient } from '@angular/common/http'; // Import HttpClient if you're using it in cancelOrder
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.css'],
  standalone: true, // Declare the component as standalone
  imports: [CommonModule] // Import CommonModule for common Angular directives
})
export class GetOrderComponent implements OnInit {
  orders: any[] = [];
  message: string = '';

  constructor(private orderService: OrderService, private http: HttpClient) {} // Include HttpClient if used in the component

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        if (data.orders && data.orders.length > 0) {
          this.orders = data.orders;
        } else {
          this.message = 'No orders found.';
        }
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.message = 'Failed to load orders.';
      }
    });
  }

  cancelOrder(orderId: number): void {
    this.http.post(`http://localhost:8080/order/${orderId}/cancel`, {}).subscribe({
      next: (response: any) => {
        this.message = 'Order cancelled successfully';
        this.loadOrders(); // Reload orders to update the status
      },
      error: (error) => {
        this.message = 'Failed to cancel order';
        console.error('Error cancelling order:', error);
      }
    }
  );
  }
}
