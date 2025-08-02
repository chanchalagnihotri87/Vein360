import { Component, inject, Input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { environment } from '../../../environments/environment';
import { UserProduct } from '../../home/shared/user-product.model';
import { ValidationMessageComponent } from '../../shared/validation-message/validation-message.component';
import ListItem from '../shared/list-tem.model';
import { ProductCategoryService } from '../shared/product-category.service';

@Component({
  selector: 'app-order-control',
  imports: [ValidationMessageComponent, ReactiveFormsModule],
  templateUrl: './order-control.component.html',
  styleUrl: './order-control.component.scss',
})
export class OrderControlComponent implements OnInit {
  @Input({ required: true }) id: number = 0;
  @Input({ required: true }) clinicId: number = 0;
  @Input({ required: true }) clinics: ListItem[] = [];
  @Input({ required: true }) product?: UserProduct;
  @Input({ required: true }) title?: string;

  public onSubmit = output<number>();
  public onClose = output();
  public orderForm: FormGroup;
  protected apiDomainUrl = environment.apiUrl;

  private formBuilder = inject(FormBuilder);
  private productCategoryService = inject(ProductCategoryService);

  constructor() {
    this.orderForm = this.createOrderForm();
  }

  ngOnInit(): void {
    this.updateOrderFormValues(this.clinicId);
  }

  private createOrderForm() {
    return this.formBuilder.group({
      clinicId: ['', Validators.required],
    });
  }

  private updateOrderFormValues(clinicId: number) {
    this.orderForm.patchValue({
      clinicId: clinicId,
    });
  }

  //#region  Protected Methods
  protected submitOrder() {
    if (this.orderForm.valid) {
      this.onSubmit.emit(this.orderForm.value.clinicId);
    }
  }

  protected closeModal() {
    this.onClose.emit();
  }

  protected getCategoryString(cateory?: number) {
    return this.productCategoryService.getCategoryString(cateory);
  }

  //#endregion
}
