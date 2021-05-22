import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { fadeIn } from '@app/animations/fadeIn.animation';
import { Category } from '@core/models/Category';
import { CategoryService } from '@core/services/category.service';
import { CategoryFormComponent } from '@app/pages/categories/category-form/category-form.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  animations: [ fadeIn ]
})
export class CategoriesComponent {

  categories$: Observable<Category[]> = this.categories.all();

  constructor(private categories: CategoryService, public dialog: MatDialog) { }

  addCategory(): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {
        type: 'add',
        shift: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '') {
        return;
      }
      this.categories.create(result).pipe(take(1)).subscribe(
        _ => this.refresh()
      );
    });
  }

  editCategory(category: Category): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {
        type: 'edit',
        category
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '') {
        return;
      }
      this.categories.update(category.id, result).pipe(take(1)).subscribe(
        _ => this.refresh()
      );
    });
  }

  refresh(): void {
    this.categories$ = this.categories.all();
  }

}
