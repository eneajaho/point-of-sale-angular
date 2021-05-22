import { Component, OnInit } from '@angular/core';
import { ProductService } from '@core/services/product.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from '@core/services/category.service';
import { fadeIn } from '@app/animations/fadeIn.animation';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ],
  animations: [fadeIn]
})
export class ProductsComponent implements OnInit {

  vm$ = this.productsService.state$;
  categories$ = this.categoryService.all();

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'lowStock',
    'optimalStock',
    'stock',
    'stock_type',
    'barcode'
  ];

  dataSource: any;
  pagination: any;

  load = new BehaviorSubject<any>(undefined);

  racing$ = this.load.asObservable().pipe(
    switchMap((value: any) => {
      // debugger;
      if (value) {
        if (value?.pageSize) {
          // pagination
          return this.productsService.loadProducts(undefined, value);
        } else {
          // filters
          return this.productsService.loadProducts(value);
        }
      } else {
        // initial load
        return this.productsService.loadProducts();
      }
    })
  );

  constructor(
    private productsService: ProductService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.vm$.subscribe(console.log);
  }

  onClickedRow(row: any): void {
    console.log(row);
  }

}
