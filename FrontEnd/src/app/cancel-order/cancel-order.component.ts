// src/app/cancel-order/cancel-order.component.ts
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css'],
  standalone: true, 
  imports: [CommonModule]
})
export class CancelOrderComponent {
  @Input() orderId?: number;

  constructor(private http: HttpClient) {}

  cancelOrder(): void {
    if (!this.orderId) {
      alert('Order ID is required');
      return;
    }
    this.http.post(`http://localhost:8080/order/5/cancel`, {}).subscribe({
      next: (response: any) => {
        alert('Order cancelled successfully');
      },
      error: (error: any) => {
        alert('Failed to cancel order');
      }
    });
  }
}
