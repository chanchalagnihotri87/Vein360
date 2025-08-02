import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { UserProduct } from './user-product.model';

@Injectable({
  providedIn: 'root',
})
export class UserProductService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) {}

  getSaleProducts() {
    return this.httpClient.get<UserProduct[]>(
      `${this.baseUrl}/user/products/sale`
    );
  }

  getProduct(productId: number) {
    return this.httpClient.get<UserProduct>(
      `${this.baseUrl}/user/product/${productId}`
    );
  }
}
