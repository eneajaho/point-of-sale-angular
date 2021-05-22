import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';
import { InvoiceService } from '@app/pages/invoice/invoice.service';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  categories$ = this.categoryService.all();
  products$ = this.productService.state$;

  vm$ = this.invoiceService.state$;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
  }

  handleProductSearch(event: any): void {
    console.log(event.target.value);
  }

  setActiveCategory(categoryId: number): void {
    this.invoiceService.setActiveCategory(categoryId);
  }

  addItem(product: Product): void {
    this.invoiceService.addInvoiceProduct(product);
  }

  removeItem(productId: number): void {
    this.invoiceService.removeInvoiceProduct(productId);
  }


}
