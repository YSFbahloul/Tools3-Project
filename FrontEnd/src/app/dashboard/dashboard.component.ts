import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';  // Import Router and RouterModule

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule],  // Ensure RouterModule is imported for routerLink directive
  standalone: true
})
export class DashboardComponent {
  constructor(private router: Router) {}  // Inject the Router service

  navigateToOrders(): void {
    this.router.navigate(['/get-orders']);  // Use the navigate method to switch to the 'get-orders' route
  }
  getOrderDetails(): void {
    this.router.navigate(['order-details/:orderId']); // Ensure this route is correctly configured in your routing module
  }
 // cancelOrder(): void {
   // this.router.navigate(['Cancel-Order']); // Ensure this route is correctly configured in your routing module
  //}
}
