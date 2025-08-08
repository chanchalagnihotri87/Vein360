import { Component, inject, Input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import ConversionHelper from '../../../common/helpers/conversion-helpter';
import { environment } from '../../../environments/environment';
import { UserProduct } from '../../home/shared/user-product.model';
import { AddressComponent } from '../../shared/address/address.component';
import { ValidationMessageComponent } from '../../shared/validation-message/validation-message.component';
import Clinic from '../shared/clinic.model';

import CreateOrderRequest from '../shared/create-order-request.model';
import { Order } from '../shared/order';
import { ProductCategoryService } from '../shared/product-category.service';

@Component({
  selector: 'app-order-control',
  imports: [ValidationMessageComponent, ReactiveFormsModule, AddressComponent],
  templateUrl: './order-control.component.html',
  styleUrl: './order-control.component.scss',
})
export class OrderControlComponent implements OnInit {
  @Input({ required: true }) id: number = 0;
  @Input({ required: true }) clinicId: number = 0;
  @Input({ required: true }) clinics: Clinic[] = [];
  @Input({ required: true }) product?: UserProduct;
  @Input() order?: Order;
  @Input({ required: true }) title?: string;

  public onSubmit = output<CreateOrderRequest>();
  public onClose = output();
  public orderForm: FormGroup;
  protected apiDomainUrl = environment.apiUrl;
  protected amount?: number;

  private formBuilder = inject(FormBuilder);
  private productCategoryService = inject(ProductCategoryService);

  constructor() {
    this.orderForm = this.createOrderForm();
  }

  ngOnInit(): void {
    this.amount = this.productRate;
    this.updateOrderFormValues(this.clinicId);

    if (this.order) {
      this.updateOrderFormValues(this.clinicId, this.order.quantity);
      this.amount = this.productRate * this.order.quantity;
    }
  }

  private createOrderForm() {
    return this.formBuilder.group({
      clinicId: ['', Validators.required],
      quantity: [1, Validators.required],
    });
  }

  private get productRate() {
    return this.order?.price ?? this.product!.price!;
  }

  private updateOrderFormValues(clinicId: number, quantity?: number) {
    this.orderForm.patchValue({
      clinicId: clinicId,
    });

    if (quantity) {
      this.orderForm.patchValue({
        quantity: quantity,
      });
    }
  }

  protected changePrice(event: Event) {
    let quantity = (event.currentTarget as HTMLInputElement).value;
    if (quantity) {
      this.amount = this.productRate! * ConversionHelper.convertToInt(quantity);
      return;
    }
    this.amount = this.productRate;
  }

  //#region  Protected Methods
  protected submitOrder() {
    if (this.orderForm.valid) {
      this.onSubmit.emit({
        clinicId: this.orderForm.value.clinicId,
        quantity: this.orderForm.value.quantity,
      });
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
