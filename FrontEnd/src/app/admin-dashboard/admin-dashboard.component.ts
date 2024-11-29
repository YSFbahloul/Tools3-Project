import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  allOrders: any[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAllOrders();
  }

  loadAllOrders(): void {
    this.authService.getALLordersforAdmin().subscribe({
      next: (response) => {
        this.allOrders = response.orders;
        console.log('All orders fetched for admin:', this.allOrders);
      },
      error: (error) => {
        console.error('Error fetching all orders:', error);
      }
    });
  }

  reassignOrder(orderId: number, newCourierId: number): void {
    this.authService.reassignOrder(orderId, newCourierId).subscribe({
      next: () => {
        alert('Order reassigned successfully.');
        this.loadAllOrders();  // Refresh the list after reassignment
      },
      error: (error) => {
        alert('Failed to reassign order: ' + error.message);
      }
    });
  }
}