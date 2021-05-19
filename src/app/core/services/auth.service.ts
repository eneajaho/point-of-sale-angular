import {Inject, Injectable} from '@angular/core';
import {Credentials} from '@core/models/credentials.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '@core/api.token';
import {distinctUntilChanged, map, shareReplay, tap} from 'rxjs/operators';
import {LoginResponse} from '@core/models/LoginResponse';
import {Router} from '@angular/router';
import {CreateAdminPayload} from '@core/models/CreateAdminPayload';
import {User} from "@core/models/user.model";

export interface AuthState {
  userId: number | null;
  access_token: string | null;
  token_type: string | null;
  expires_at: string | null;
  name: string | null;
  role: string | null; // admin, manager, economist, user
}

export const initialState: AuthState = {
  userId: null,
  access_token: null,
  token_type: null,
  expires_at: null,
  name: null,
  role: null
};

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    @Inject(API_URL) private api: string,
    private http: HttpClient,
    private router: Router
  ) {
  }

  private auth = new BehaviorSubject<AuthState>(this.getLocalState());
  public auth$ = this.auth.asObservable().pipe(distinctUntilChanged(),
    tap(x => console.log('auth', x))
  );

  adminExists$ = this.http.get<{ exists: boolean }>(`${this.api}/adminExists`).pipe(
    shareReplay(1),
  );

  profile$ = this.http.get<User>(`${this.api}/auth/user`);

  public getLocalState(): AuthState {
    const localState = localStorage.getItem('auth');
    if (localState) {
      return JSON.parse(localState) as AuthState;
    }
    return initialState;
  }

  login(credentials: Credentials): Observable<LoginResponse> {
    const path = `${this.api}/login`;
    return this.http.post<LoginResponse>(path, credentials).pipe(
      tap(data => {
        this.auth.next(data);
        localStorage.setItem('auth', JSON.stringify(data));
        this.router.navigateByUrl('/products').then();
      })
    );
  }

  createAdmin(payload: CreateAdminPayload): Observable<{ message: string }> {
    const path = `${this.api}/createAdmin`;
    return this.http.post<{ message: string }>(path, payload);
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.auth.next(initialState);
    this.router.navigateByUrl('auth/login').then();
  }

}
