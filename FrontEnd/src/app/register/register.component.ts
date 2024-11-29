// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],  // Add FormsModule to imports array here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  role: string = 'customer'; // Default role

  constructor(private authService: AuthService) {}

  registerUser() {
    const userData = { name: this.name, email: this.email, phone: this.phone, password: this.password, role: this.role };
    this.authService.register(userData).subscribe({
      next: (response) => {
        alert(response.message);
      },
      error: (error) => {
        alert(error.error.error || 'Registration failed');
      }
    });
  }
}
