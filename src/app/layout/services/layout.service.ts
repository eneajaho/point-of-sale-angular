import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {

  navItems = [
    {
      label: 'Invoice',
      path: 'invoice',
      icon: 'receipt',
      roles: [ 'admin', 'manager', 'user' ]
    },
    {
      label: 'Products',
      path: 'products',
      icon: 'category',
      roles: [ 'admin', 'manager' ]
    },
    {
      label: 'Manage Users',
      path: 'manage-users',
      icon: 'people',
      roles: [ 'admin' ]
    },
    {
      label: 'Shifts',
      path: 'shifts',
      icon: 'schedule',
      roles: [ 'admin', 'manager' ]
    },
    {
      label: 'Categories',
      path: 'categories',
      icon: 'category',
      roles: [ 'admin', 'manager' ]
    }
  ];

}
