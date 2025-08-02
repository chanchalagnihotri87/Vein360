import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Order } from './order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = `${environment.apiUrl}/orders`;
  constructor(private httpClient: HttpClient) {}

  createOrder(productId: number, clinicId: number) {
    return this.httpClient.post(this.baseUrl, { productId, clinicId });
  }

  updateOrder(id: number, clinicId: number) {
    return this.httpClient.patch<Order>(
      `${this.baseUrl}/${id}?clinicId=${clinicId}`,
      {}
    );
  }

  deleteOrder(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getMyOrders() {
    return this.httpClient.get<Order[]>(`${this.baseUrl}/myorders`);
  }
}
