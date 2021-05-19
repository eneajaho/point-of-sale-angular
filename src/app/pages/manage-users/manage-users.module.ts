import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageUsersComponent} from './containers/manage-users/manage-users.component';
import {RouterModule, Routes} from '@angular/router';
import {UsersTableComponent} from '@app/pages/manage-users/components/users-table/users-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AddUserComponent} from './containers/add-user/add-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {EditUserComponent} from '@app/pages/manage-users/containers/edit-user/edit-user.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { UserDetailsComponent } from './containers/user-details/user-details.component';
import {MatIconModule} from '@angular/material/icon';
import {ConfirmationDialogModule} from '@app/pages/manage-users/components/confirmation-dialog/confirmation-dialog.module';
import { MatCardModule } from '@angular/material/card';
import { UserFormComponent } from './components/user-form/user-form.component';


const routes: Routes = [
  {
    path: '',
    component: ManageUsersComponent,
    data: {animation: 'ManageUsers'}
  },
  {
    path: 'add',
    component: AddUserComponent,
    data: {animation: 'Add'}
  },
  {
    path: 'edit/:id',
    component: EditUserComponent,
    data: {animation: 'Edit'}
  },
  {
    path: 'details/:id',
    component: UserDetailsComponent,
    data: {animation: 'Details'}
  }
];

@NgModule({
  declarations: [
    ManageUsersComponent,
    UsersTableComponent,
    AddUserComponent,
    EditUserComponent,
    UserDetailsComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    ConfirmationDialogModule,
    MatCardModule
  ]
})
export class ManageUsersModule {
}
