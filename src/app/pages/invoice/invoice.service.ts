import { Injectable } from '@angular/core';
import { Product } from '@core/models/product.model';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export interface InvoiceProduct {
  product: Product;
  count: number;
}

export interface InvoiceState {
  activeCategoryId: number | null;
  invoiceProducts: InvoiceProduct[];
}

export const initialState: InvoiceState = {
  activeCategoryId: null,
  invoiceProducts: []
};

@Injectable({ providedIn: 'root' })
export class InvoiceService {

  private invoiceState = new BehaviorSubject<InvoiceState>(initialState);
  state$ = this.invoiceState.asObservable().pipe(distinctUntilChanged());

  get state(): InvoiceState {
    return this.invoiceState.getValue();
  }

  constructor() {
  }

  setActiveCategory(categoryId: number): void {
    if (this.state.activeCategoryId === categoryId) {
      this.invoiceState.next({
        ...this.state,
        activeCategoryId: null
      });
    } else {
      this.invoiceState.next({
        ...this.state,
        activeCategoryId: categoryId
      });
    }
    console.log(this.state.activeCategoryId);
  }

  addInvoiceProduct(product: Product): void {
    const existingProduct = this.state.invoiceProducts.find(x => x.product.id === product.id);

    if (existingProduct) {
      const newProductsList = this.state.invoiceProducts.map(item => {
        if (item.product.id === product.id) {
          return {
            product,
            count: item.count + 1
          };
        }
        return item;
      });
      this.invoiceState.next({
        ...this.state,
        invoiceProducts: newProductsList
      });
    } else {
      this.invoiceState.next({
        ...this.state,
        invoiceProducts: [
          ...this.state.invoiceProducts,
          { product, count: 1 }
        ]
      });
    }
  }

  removeInvoiceProduct(productId: number): void {
    const newProductsList = this.state.invoiceProducts.filter(item => item.product.id !== productId);

    this.invoiceState.next({
      ...this.state,
      invoiceProducts: newProductsList
    });
  }

}
