import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login response:', response);  // Check what the backend returns
          if (response.user && response.user.role) {  // Assuming response structure includes user object
            this.handleRouting(response.user.role);
          } else {
            this.message = 'Login successful, but no role found.';
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.message = 'Login failed: ' + (error.error?.message || 'Unknown error');
        }
      });
    } else {
      this.message = 'Please check your credentials.';
    }
  }
  

  private handleRouting(role: string) {
    console.log('Routing based on role:', role);
  
    switch (role) {
      case 'admin':
        console.log('Redirecting to Admin Dashboard');
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'courier':
        console.log('Redirecting to Courier Dashboard');
        this.router.navigate(['/courier-dashboard']);
        break;
      default:
        console.log('Redirecting to User Dashboard');
        this.router.navigate(['/dashboard']);
        break;
    }
  }
}
