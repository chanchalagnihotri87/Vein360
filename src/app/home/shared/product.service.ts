import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import ListItem from '../../order/shared/list-tem.model';
import Product from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = `${environment.apiUrl}/products`;

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  getSortProductList(): Observable<ListItem[]> {
    return this.httpClient.get<ListItem[]>(`${this.baseUrl}/listitems/sort`);
  }
}
