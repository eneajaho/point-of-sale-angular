import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: [ './create-admin.component.scss' ]
})
export class CreateAdminComponent implements OnInit {

  showForm = false;

  form = this.fb.group({
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    password_confirmation: [ '', Validators.required ],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.auth.adminExists$.pipe(
      take(1),
    ).subscribe(({ exists }) => {
        if (exists) {
          this.router.navigateByUrl('/auth');
        } else {
          this.showForm = true;
        }
      }
    );
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.auth.createAdmin(this.form.value).pipe(take(1)).subscribe(
      ({ message }) => {
        this.openSnackBar(message, 'success-snackbar');
        location.reload();
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.openSnackBar(error.error.message, 'alert-snackbar');
          }
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
