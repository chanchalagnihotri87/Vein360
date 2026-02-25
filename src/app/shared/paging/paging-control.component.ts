import { Component, Input, output } from '@angular/core';
import PagedResponse from '../paged-response/paged-response';

@Component({
  selector: 'app-paging-control',
  imports: [],
  templateUrl: './paging-control.component.html',
})
export class PagingControlComponent<T> {
  @Input({ required: true }) pagedResponse: PagedResponse<T> | undefined;
  onPageChanged = output<number>();

  goToPage(page: number) {
    debugger;
    this.onPageChanged.emit(page);
  }
}
