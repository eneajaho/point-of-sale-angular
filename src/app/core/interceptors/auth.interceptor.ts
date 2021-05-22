import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService, AuthState } from '@core/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.auth$.pipe(
      switchMap((auth: AuthState) => {
        const { access_token } = auth;
        if (access_token) {
          const authReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${ access_token }`)
          });
          return next.handle(authReq);
        } else {
          return next.handle(request);
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.error.message?.includes('Unauthenticated.')) {
            this.auth.logout();
            this.router.navigate(['/auth']).then();
          }
        }
        return throwError(error);
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
