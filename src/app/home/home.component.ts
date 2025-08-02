import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

import { environment } from '../../environments/environment';

import { UserInfoService } from '../login/shared/user-info.service';
import { OrderControlComponent } from '../order/order-control/order-control.component';
import { ClinicService } from '../order/shared/clinic.service';
import ListItem from '../order/shared/list-tem.model';
import { OrderService } from '../order/shared/order.service';
import { BreadcrumbService } from '../shared/breadcrumb/shared/breadcrumb.service';
import { ProductType } from './shared/product-type';
import Product from './shared/product.model';
import { ProductService } from './shared/product.service';
import { UserProduct } from './shared/user-product.model';
import { UserProductService } from './shared/user-product.service';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, RouterModule, AutocompleteLibModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: UserProduct[] = [];
  allProducts: UserProduct[] = [];
  searchText: string = '';
  selectedCategories: number[] = [];
  clinics: ListItem[] = [];
  orderNowModal?: BsModalRef;

  apiDomainUrl = environment.apiUrl;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly userProductService: UserProductService,
    private readonly userInfoService: UserInfoService,
    private readonly modalService: BsModalService,
    private readonly orderService: OrderService,
    private readonly router: Router,
    private readonly clinicService: ClinicService,
    private readonly productService: ProductService
  ) {
    this.setBereadcrumb();
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadClinics();
  }

  private loadProducts() {
    this.userProductService.getSaleProducts().subscribe((products) => {
      this.products = products;
      this.allProducts = products;
    });
  }

  private loadClinics() {
    this.clinicService.getClinicsList().subscribe((clinics) => {
      this.clinics = clinics;
    });
  }

  private setBereadcrumb() {
    this.breadcrumbService.breadcrumbs.set([{ label: 'Home', path: '' }]);
  }

  protected getCategoryProductCount(category: number) {
    return this.allProducts.filter((x) => x.type == category).length;
  }

  protected get ProductType() {
    return ProductType;
  }

  //#region Search Products
  protected onChangeSearch() {
    this.filterProducts();
  }

  protected filterProducts() {
    let filteredProducts = this.allProducts;

    let searchWords = this.searchText.trim().split(' ');

    if (searchWords.length > 0) {
      filteredProducts = this.allProducts
        .map((x) => {
          let searchMatchRank: number = 0;
          searchWords.forEach((searchWord) => {
            if (x.name.toLowerCase().indexOf(searchWord.toLowerCase()) != -1) {
              searchMatchRank++;
            }
          });
          return { ...x, searchRank: searchMatchRank };
        })
        .filter((x) => x.searchRank > 0);
    }

    if (this.selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(
        (x) => this.selectedCategories.indexOf(x.type) > -1
      );
    }

    this.products = filteredProducts.sort((a, b) =>
      a.searchRank > b.searchRank ? -1 : 1
    );
  }

  protected clearSearch() {
    console.log('clear serach called');
    this.searchText = '';
    this.onChangeSearch();
  }

  protected toggleCategorySelection(category: number) {
    if (this.selectedCategories.indexOf(category) === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(
        this.selectedCategories.indexOf(category),
        1
      );
    }

    this.filterProducts();
  }

  protected categoryIsSelected(category: number): boolean {
    return this.selectedCategories.indexOf(category) != -1;
  }

  protected get anyCategorySelected(): boolean {
    return this.selectedCategories.length > 0;
  }

  protected clearCategorySelection() {
    this.selectedCategories = [];
    this.onChangeSearch();
  }

  //#endregion

  //#region OrderNow
  protected orderNow(productId: number) {
    this.userProductService.getProduct(productId).subscribe((product) => {
      this.showOrderNowModal(product);
    });
  }

  private showOrderNowModal(product: Product) {
    const configuartions: ModalOptions = {
      initialState: {
        product: product,
        clinicId: this.defaultClinicId,
        clinics: this.clinics,
        title: 'Confirmation',
      },
      backdrop: 'static',
    };

    this.orderNowModal = this.modalService.show(
      OrderControlComponent,
      configuartions
    );

    this.orderNowModal?.content.onSubmit.subscribe((clinicId: number) => {
      this.orderService.createOrder(product.id, clinicId).subscribe((order) => {
        this.router.navigate(['orders']);
        this.hideOrderNowModal();
      });
    });

    this.orderNowModal?.content.onClose.subscribe(() => {
      this.hideOrderNowModal();
    });
  }

  private get defaultClinicId() {
    if (this.userInfoService.defaultClinicId()) {
      return this.userInfoService.defaultClinicId();
    }

    if (this.clinics.length > 0) {
      return this.clinics[0].id;
    }

    return undefined;
  }

  private hideOrderNowModal() {
    this.orderNowModal?.hide();
  }
  //#endregion
}
