import { Component } from '@angular/core';
import { ShiftsService } from '@core/services/shifts.service';
import { Shift } from '@core/models/shift.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ShiftsFormComponent } from '@app/pages/shifts/shifts-form/shifts-form.component';
import { fadeIn } from '@app/animations/fadeIn.animation';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  animations: [ fadeIn ]
})
export class ShiftsComponent {

  shifts$: Observable<Shift[]> = this.shifts.all();

  constructor(private shifts: ShiftsService, public dialog: MatDialog) { }

  addShift(): void {
    const dialogRef = this.dialog.open(ShiftsFormComponent, {
      data: {
        type: 'add',
        shift: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '') {
        return;
      }
      this.shifts.create(result).pipe(take(1)).subscribe(
        _ => this.refresh()
      );
    });
  }

  editShift(shift: Shift): void {
    const dialogRef = this.dialog.open(ShiftsFormComponent, {
      data: {
        type: 'edit',
        shift
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '') {
        return;
      }
      this.shifts.update(shift.id, result).pipe(take(1)).subscribe(
        _ => this.refresh()
      );
    });
  }

  refresh(): void {
    this.shifts$ = this.shifts.all();
  }

}
