import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order/order.component';
import { GetOrderComponent } from './get-order/get-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CourierDashboardComponent } from './courier-dashboard/courier-dashboard.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component'; // Import OrderDetailsComponent


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'order', component: OrderComponent },
  { path: 'get-orders', component: GetOrderComponent },
  {path :'Cancel-Order',component:CancelOrderComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },  // Admin dashboard
  { path: 'courier-dashboard', component: CourierDashboardComponent },
  { path: 'order-details/:orderId', component: OrderDetailsComponent }, // Ensure this path is correct
  // Other routes go here

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
