import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '@core/services/product.service';
import {Product, ProductDetails} from '@core/models/product.model';
import {Category} from '@core/models/Category';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() product?: ProductDetails;
  @Input() readonly = false;
  @Input() categories: Category[] = [];

  @Output() submitted = new EventEmitter<ProductDetails>();

  form = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    barcode: ['', Validators.required],
    low_stock: ['', Validators.required],
    optimal_stock: ['', Validators.required],
    stock_type: ['', Validators.required],
    category_id: ['', Validators.required]
  });
  filteredOptions?: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.filteredOptions = this.form.get('category_id').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    if (this.product) {
      console.log(this.product);
      this.form.patchValue(this.product);
      this.form.get('stock_type')?.patchValue(this.product.stock.type);
      this.form.get('category_id')?.patchValue(this.product.category.id);
    }
    if (this.readonly) {
      this.form.disable();
    }
  }

  private _filter(category: Category | string): Category[] {
    if (typeof category === 'string') {
      return this.categories;
    }
    const filterValue = category.name.toLowerCase();

    // @ts-ignore
    return this.categories?.filter(c => c.name.toLowerCase().includes(filterValue));
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.value);
  }

}
