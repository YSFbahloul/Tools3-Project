import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';  // Adjust if your Flask API is running on a different port

  constructor(private http: HttpClient) {}

  register(userData: RegistrationData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, { user_id: userId });
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create_order`, orderData);
  }

  getMyOrders(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/my_orders`, { params: { user_id: userId } });
  }

  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/order/${orderId}`);
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/order/${orderId}/cancel`, {});
  }

  acceptOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/order/${orderId}/accept`, {});
  }

  rejectOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/order/${orderId}/reject`, {});
  }

  updateOrderStatusDelivered(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/update_order_status_delivered`, { order_id: orderId });
  }

  updateOrderStatusInTransit(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/update_order_status_inTransit`, { order_id: orderId });
  }

  getAssignedOrders(courierName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/AssignedOrders/${courierName}`);
  }

  updateOrderStatusPickedUp(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/update_order_status_pickedup`, { order_id: orderId });
  }

  reassignOrder(orderId: number, newCourierId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/reassign_order`, { order_id: orderId, courier: newCourierId });
  }

  // New function to get orders specifically for DHL
  getOrdersForDHL(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders_for_dhl`);
    
  }
  getALLordersforAdmin(): Observable<any> {
    return this.http.get(`${this.apiUrl}/manage_get_all`);
    
  }
  

}
