import { Component } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: [ './add-user.component.scss' ]
})
export class AddUserComponent {

  constructor(
    private users: UsersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  handleAdd(data: User): void {
    this.users.create(data).pipe(take(1)).subscribe(value => {
        this.router.navigate([ 'manage-users' ]).then();
        this.snackBar.open('User created successfully', 'close', { duration: 1000 });
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.openSnackBar(error.error.message, 'alert-snackbar');
          }
          if (typeof error.error.message === 'string') {
            this.openSnackBar(error.error.message, 'alert-snackbar');
          }
          // const unhandledErrors = handleServerSideValidation(error, this.form);
          // console.log(unhandledErrors, error);
          // if (unhandledErrors) {
          //   this.openSnackBar(error.statusText, 'error');
          // }
        }
      }
    );
  }

  openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass
    });
  }

}
