import { inject } from '@angular/core';
import { BreadcrumbItem } from '../shared/breadcrumb/shared/breadcrumb-item.model';
import { BreadcrumbService } from '../shared/breadcrumb/shared/breadcrumb.service';

export class BaseComponent {
  private breadcrumbService = inject(BreadcrumbService);

  protected setBereadcrumb(breadcrumbs: BreadcrumbItem[]) {
    this.breadcrumbService.breadcrumbs.set(breadcrumbs);
  }
}
