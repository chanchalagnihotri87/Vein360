import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { environment } from '../../environments/environment';
import { ProductType } from '../home/shared/product-type';
import { UserProduct } from '../home/shared/user-product.model';
import { UserProductService } from '../home/shared/user-product.service';
import { AddressComponent } from '../shared/address/address.component';
import { BaseComponent } from '../shared/base-component';
import { ConfirmationMessageComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { MessageDisplayService } from '../shared/message-display/message-display.service';
import { TempDataService } from '../shared/temp-data/tempdata.service';
import { OrderControlComponent } from './order-control/order-control.component';
import Clinic from './shared/clinic.model';
import { ClinicService } from './shared/clinic.service';
import CreateOrderRequest from './shared/create-order-request.model';
import { Order } from './shared/order';
import { OrderStatus } from './shared/order-status';
import { OrderService } from './shared/order.service';
import { ProductCategoryService } from './shared/product-category.service';

@Component({
  selector: 'app-order',
  imports: [TooltipModule, DatePipe, AddressComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent extends BaseComponent implements OnInit {
  protected orders: Order[] = [];
  protected clinics: Clinic[] = [];
  protected orderLoaded = false;
  protected apiDomainUrl = environment.apiUrl;

  private orderDetailModal?: BsModalRef;
  private confirmationModalRef?: BsModalRef;

  constructor(
    private readonly orderService: OrderService,
    private readonly modalService: BsModalService,
    private readonly clinicService: ClinicService,
    private readonly userProductService: UserProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly tempData: TempDataService,
    private readonly msgDisplayService: MessageDisplayService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.setBereadcrumb([{ label: 'Orders', path: '' }]);
    this.loadClinics();

    if (this.tempData.getData('orderCreated')) {
      this.loadOrders(() =>
        this.msgDisplayService.showSuccessMessage(
          'Order created successfully.',
        ),
      );
      return;
    }

    this.loadOrders();
  }

  //#region Public Methods
  protected repeatOrder(order: Order, event: Event) {
    this.hideButtonTooltip(event);

    this.userProductService
      .getProduct(order.product.id)
      .subscribe((product) => {
        this.showRepeatOrderModal(order, product);
      });
  }

  protected editOrder(order: Order, event: Event) {
    this.hideButtonTooltip(event);

    this.userProductService
      .getProduct(order.product.id)
      .subscribe((product) => {
        this.showEditOrderModal(order, product);
      });
  }

  protected deleteOrder(order: Order, event: Event) {
    this.hideButtonTooltip(event);

    const initialState: ModalOptions = {
      initialState: {
        message: 'Are you sure you want to delete this order?',
      },
    };
    this.confirmationModalRef = this.modalService.show(
      ConfirmationMessageComponent,
      initialState,
    );

    this.confirmationModalRef.content.onYes.subscribe(() => {
      this.orderService.deleteOrder(order.id).subscribe(() => {
        this.hideConfirmationModal();
        this.orders = this.orders.filter((ord) => ord.id != order.id);
        this.msgDisplayService.showSuccessMessage(
          'Order deleted successfully.',
        );
      });
    });

    this.confirmationModalRef.content.onNo.subscribe(() => {
      this.hideConfirmationModal();
    });
  }

  protected getStatusString(status: OrderStatus) {
    return OrderStatus[status];
  }

  protected getCategoryString(category: ProductType) {
    return this.productCategoryService.getCategoryString(category);
  }

  protected isNotProcessed(order: Order) {
    return order.status == OrderStatus.Ordered;
  }

  //#endregion

  //#region Private Methods

  private loadClinics() {
    this.clinicService.getMyClinics().subscribe((clinics) => {
      this.clinics = clinics;
    });
  }

  private loadOrders(callback?: () => void) {
    this.orderService.getMyOrders().subscribe((orders) => {
      this.orders = orders;
      this.orderLoaded = true;

      if (callback) {
        callback();
      }
    });
  }

  private showRepeatOrderModal(order: Order, product: UserProduct) {
    const configuartions: ModalOptions = {
      initialState: {
        order: order,
        product: product,
        clinicId: order.clinic.id,
        clinics: this.clinics,
        title: 'Repeat Order',
      },
      backdrop: 'static',
    };

    this.orderDetailModal = this.modalService.show(
      OrderControlComponent,
      configuartions,
    );

    this.orderDetailModal?.content.onSubmit.subscribe(
      (request: CreateOrderRequest) => {
        this.orderService
          .createOrder(request.clinicId, product.id, request.quantity)
          .subscribe((updatedOrder) => {
            this.loadOrders(() =>
              this.msgDisplayService.showSuccessMessage(
                'Order created successfully.',
              ),
            );
            this.hideRepeatOrderModal();
          });
      },
    );

    this.orderDetailModal?.content.onClose.subscribe(() => {
      this.hideRepeatOrderModal();
    });
  }

  private hideRepeatOrderModal() {
    this.orderDetailModal?.hide();
  }

  private showEditOrderModal(order: Order, product: UserProduct) {
    const configuartions: ModalOptions = {
      initialState: {
        order: order,
        product: product,
        clinicId: order.clinic.id,
        clinics: this.clinics,
        title: 'Edit Order',
      },
      backdrop: 'static',
    };

    this.orderDetailModal = this.modalService.show(
      OrderControlComponent,
      configuartions,
    );

    this.orderDetailModal?.content.onSubmit.subscribe(
      (request: CreateOrderRequest) => {
        this.orderService
          .updateOrder(order.id, request.clinicId, request.quantity)
          .subscribe((updatedOrder) => {
            //Update order in orders collection
            let orderIndex = this.orders.indexOf(order);
            this.orders[orderIndex] = updatedOrder;

            //Close order modal
            this.hideEditOrderModal();

            this.msgDisplayService.showSuccessMessage(
              'Order updated successfully.',
            );
          });
      },
    );

    this.orderDetailModal?.content.onClose.subscribe(() => {
      this.hideEditOrderModal();
    });
  }

  private hideEditOrderModal() {
    this.orderDetailModal?.hide();
  }

  private hideConfirmationModal() {
    this.confirmationModalRef?.hide();
  }
  //#endregion
}
