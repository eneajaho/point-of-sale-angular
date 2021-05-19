import {Inject, Injectable} from '@angular/core';
import {API_URL} from '@core/api.token';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '@core/models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users = new BehaviorSubject<User[]>([]);
  users$ = this.users.asObservable();

  constructor(@Inject(API_URL) private api: string, private http: HttpClient, private snackBar: MatSnackBar) {}

  loadUsers(): void {
    this.http.get<User[]>(`${this.api}/users`).pipe(take(1)).subscribe(response => {
      this.users.next(response);
    }, error => {
        this.openSnackBar(error.message, 'danger-alert');
    });
  }

  one(id: number): Observable<any> {
    return this.http.get(`${this.api}/users/${id}`);
  }

  create(payload: User): Observable<any> {
    return this.http.post(`${this.api}/users`, payload);
  }

  update(id: number, payload: User): Observable<any> {
    return this.http.patch(`${this.api}/users/${id}`, payload);
  }

  delete(id: number): void {
    this.http.delete(`${this.api}/users/${id}`).pipe(take(1)).subscribe(
      value => {
        this.users$ = this.users$.pipe(map(users => users.filter(u => u.id !== id)));
        this.openSnackBar('User deleted successfully', 'success-snackbar');
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.openSnackBar(error.error.message, 'alert-snackbar');
          }
          if (typeof error.error.message === 'string') {
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
