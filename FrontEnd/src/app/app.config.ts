import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { HttpClientModule } from '@angular/common/http';
import { GetOrderComponent } from './get-order/get-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CourierDashboardComponent } from './courier-dashboard/courier-dashboard.component';
 // Make sure to import the component

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'get-orders', component: GetOrderComponent },
  { path: 'order-details/:orderId', component: OrderDetailsComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },  // Admin dashboard
  { path: 'courier-dashboard', component: CourierDashboardComponent },
  {path :'Cancel-Order',component:CancelOrderComponent},
   // Define the route for cancelling an order
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration()
  ]
  
};
