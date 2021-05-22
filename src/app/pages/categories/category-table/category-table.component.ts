import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '@core/models/Category';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html'
})
export class CategoryTableComponent {

  @Input() data: Category[] = [];

  @Output() opened = new EventEmitter<Category>();

  displayedColumns: string[] = [ 'id', 'name', 'icon' ];
}
