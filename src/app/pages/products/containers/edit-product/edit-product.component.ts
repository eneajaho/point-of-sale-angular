import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import {CategoryService} from '@core/services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  product$ = this.route.paramMap.pipe(switchMap(params => {
    // tslint:disable-next-line:no-non-null-assertion
    return this.productService.getById(params.get('id')!);
  }));
  categories$ = this.categoryService.all();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  handleEdit(): void {
    console.log("edit");
  }

}
