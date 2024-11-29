import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Add this import
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  standalone: true,
  imports: [FormsModule],  // Import FormsModule here

})
export class OrderDetailsComponent implements OnInit {
  orderId: number | null = null;
  order: any = null;
  errorMessage: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  // Fetch order details by orderId
  getOrderDetails(): void {
    if (this.orderId !== null) {
      this.orderService.getOrderDetails(this.orderId).subscribe({
        next: (data) => {
          this.order = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.order = null;
          this.errorMessage = 'Order not found. Please check the order ID and try again.';
        }
      });
    } else {
      this.errorMessage = 'Please enter a valid order ID.';
    }
  }
  }

