import { Injectable, signal } from '@angular/core';
import { BreadcrumbItem } from './breadcrumb-item.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  public breadcrumbs = signal<BreadcrumbItem[]>([]);
  constructor() {}
}
