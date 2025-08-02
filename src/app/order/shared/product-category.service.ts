import { Injectable } from '@angular/core';
import { ProductType } from '../../home/shared/product-type';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  public getCategoryString(cateory?: number) {
    if (!cateory) {
      return '';
    }

    if (cateory == ProductType.ProcedurePack) {
      return 'Procedure Pack';
    }
    return ProductType[cateory];
  }
}
