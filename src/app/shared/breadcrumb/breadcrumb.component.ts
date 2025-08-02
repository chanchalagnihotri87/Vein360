import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from './shared/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  constructor(private breadcrumbService: BreadcrumbService) {}

  get breadcrumbs() {
    return this.breadcrumbService.breadcrumbs();
  }
}
