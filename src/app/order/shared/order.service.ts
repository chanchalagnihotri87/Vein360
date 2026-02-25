import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import PagedResponse from '../../shared/paged-response/paged-response';
import { Order } from './order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = `${environment.apiUrl}/orders`;
  constructor(private httpClient: HttpClient) {}

  createOrder(clinicId: number, productId: number, quantity: number) {
    return this.httpClient.post(this.baseUrl, {
      clinicId,
      productId,
      quantity,
    });
  }

  updateOrder(id: number, clinicId: number, quantity: number) {
    return this.httpClient.patch<Order>(
      `${this.baseUrl}/${id}?clinicId=${clinicId}&quantity=${quantity}`,
      {},
    );
  }

  deleteOrder(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getMyOrders(page?: number) {
    return this.httpClient.get<PagedResponse<Order>>(
      `${this.baseUrl}/myorders?page=${page}`,
    );
  }
}
