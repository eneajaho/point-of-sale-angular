import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyLayoutComponent } from './layout/containers/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './layout/containers/main-layout/main-layout.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { NonAuthGuard } from '@core/guards/non-auth.guard';
import { RoleGuard } from '@core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '', component: EmptyLayoutComponent, canActivate: [ NonAuthGuard ], children: [
      {
        path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
    ]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [ AuthGuard ], children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        canActivate: [ RoleGuard ],
        data: {},
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'manage-users',
        canActivate: [ RoleGuard ],
        loadChildren: () => import('./pages/manage-users/manage-users.module').then(m => m.ManageUsersModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'shifts',
        loadChildren: () => import('./pages/shifts/shifts.module').then(m => m.ShiftsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./pages/invoice/invoice.module').then(m => m.InvoiceModule)
      },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
