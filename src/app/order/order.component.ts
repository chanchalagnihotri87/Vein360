import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { environment } from '../../environments/environment';
import { ProductType } from '../home/shared/product-type';
import { UserProduct } from '../home/shared/user-product.model';
import { UserProductService } from '../home/shared/user-product.service';
import { BaseComponent } from '../shared/base-component';
import { ConfirmationMessageComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { OrderControlComponent } from './order-control/order-control.component';
import { ClinicService } from './shared/clinic.service';
import ListItem from './shared/list-tem.model';
import { Order } from './shared/order';
import { OrderStatus } from './shared/order-status';
import { OrderService } from './shared/order.service';
import { ProductCategoryService } from './shared/product-category.service';

@Component({
  selector: 'app-order',
  imports: [TooltipModule, DatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent extends BaseComponent implements OnInit {
  protected orders: Order[] = [];
  protected clinics: ListItem[] = [];
  protected orderLoaded = false;
  protected apiDomainUrl = environment.apiUrl;

  private orderDetailModal?: BsModalRef;
  private confirmationModalRef?: BsModalRef;

  constructor(
    private readonly orderService: OrderService,
    private readonly modalService: BsModalService,
    private readonly clinicService: ClinicService,
    private readonly userProductService: UserProductService,
    private readonly productCategoryService: ProductCategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadOrders();
    this.setBereadcrumb([{ label: 'Orders', path: '' }]);
    this.loadClinics();
  }

  private loadClinics() {
    this.clinicService.getClinicsList().subscribe((clinics) => {
      this.clinics = clinics;
    });
  }

  private loadOrders() {
    this.orderService.getMyOrders().subscribe((orders) => {
      this.orders = orders;
      console.log('Orders:');
      console.log(orders);
      this.orderLoaded = true;
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

  //#region Edit Order
  protected editOrder(order: Order) {
    this.userProductService
      .getProduct(order.product.id)
      .subscribe((product) => {
        this.showEditOrderModal(order, product);
      });
  }

  private showEditOrderModal(order: Order, product: UserProduct) {
    const configuartions: ModalOptions = {
      initialState: {
        product: product,
        clinicId: order.clinic.id,
        clinics: this.clinics,
        title: 'Edit Order',
      },
      backdrop: 'static',
    };

    this.orderDetailModal = this.modalService.show(
      OrderControlComponent,
      configuartions
    );

    this.orderDetailModal?.content.onSubmit.subscribe((clinicId: number) => {
      this.orderService
        .updateOrder(order.id, clinicId)
        .subscribe((updatedOrder) => {
          //Update order in orders collection
          let orderIndex = this.orders.indexOf(order);
          this.orders[orderIndex] = updatedOrder;

          //Close order modal
          this.hideEditOrderModal();
        });
    });

    this.orderDetailModal?.content.onClose.subscribe(() => {
      this.hideEditOrderModal();
    });
  }

  private hideEditOrderModal() {
    this.orderDetailModal?.hide();
  }

  //#endregion

  //#region Delete Order
  protected deleteOrder(order: Order) {
    const initialState: ModalOptions = {
      initialState: {
        message: 'Are you sure you want to delete this order?',
      },
    };
    this.confirmationModalRef = this.modalService.show(
      ConfirmationMessageComponent,
      initialState
    );

    this.confirmationModalRef.content.onYes.subscribe(() => {
      this.orderService.deleteOrder(order.id).subscribe(() => {
        this.hideConfirmationModal();
        this.orders = this.orders.filter((ord) => ord.id != order.id);
      });
    });

    this.confirmationModalRef.content.onNo.subscribe(() => {
      this.hideConfirmationModal();
    });
  }

  private hideConfirmationModal() {
    this.confirmationModalRef?.hide();
  }
  //#endregion
}
