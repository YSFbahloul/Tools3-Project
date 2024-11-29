import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  imports: [ReactiveFormsModule],  // Import ReactiveFormsModule here
  standalone: true  // This is required to use imports in a component
})
export class OrderComponent {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.orderForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Adding the email field with validators
      product_id: ['', Validators.required],
      delivery_address: ['', Validators.required]
    });
  }

  onSubmitOrder() {
    if (this.orderForm.valid) {
      this.orderService.createOrder(this.orderForm.value).subscribe({
        next: (response) => {
          console.log('Order successfully created!', response);
          alert('Order successfully created!');
        },
        error: (error) => {
          console.error('Failed to create order', error);
          alert('Failed to create order');
        }
      });
    } else {
      console.log('Form is invalid', this.orderForm.errors);
      alert('Please check your form entries and try again.');
    }
  }
}
