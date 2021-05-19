import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './containers/all-products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { AddProductComponent } from './containers/add-product/add-product.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductDetailsComponent } from '@app/pages/products/containers/product-details/product-details.component';
import { ProductTableComponent } from '@app/pages/products/components/product-table/product-table.component';
import { ProductFilterFormComponent } from './components/product-filter-form/product-filter-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditProductComponent } from './containers/edit-product/edit-product.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'add',
    component: AddProductComponent
  },
  {
    path: 'edit/:id',
    component: EditProductComponent
  }
];

@NgModule({
  declarations: [
    // containers
    ProductsComponent,
    AddProductComponent,
    ProductDetailsComponent,

    // components
    ProductTableComponent,
      ProductFilterFormComponent,
      EditProductComponent,
      ProductFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ]
})
export class ProductsModule {
}
