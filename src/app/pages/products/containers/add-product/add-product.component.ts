import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { ProductDetails } from '@core/models/product.model';
import {CategoryService} from '@core/services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [ './add-product.component.scss' ]
})
export class AddProductComponent {

  constructor(
    private categoryService: CategoryService
  ) {}

  categories$ = this.categoryService.all();
  handleAdd(product: ProductDetails): void {
    // this.productsService.addProduct()
  }

}
