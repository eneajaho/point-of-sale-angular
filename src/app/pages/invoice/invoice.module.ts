import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';


const routes: Routes = [
  { path: '', component: InvoiceComponent }
];


@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatCardModule
  ],
  exports: [RouterModule]
})
export class InvoiceModule { }
