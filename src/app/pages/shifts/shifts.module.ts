import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftsComponent } from './shifts.component';
import { RouterModule, Routes } from '@angular/router';
import { ShiftsTableComponent } from './shifts-table/shifts-table.component';
import { ShiftsFormComponent } from './shifts-form/shifts-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ShiftsComponent }
];

@NgModule({
  declarations: [
    ShiftsComponent,
    ShiftsTableComponent,
    ShiftsFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  exports: [ RouterModule ]
})
export class ShiftsModule {
}
