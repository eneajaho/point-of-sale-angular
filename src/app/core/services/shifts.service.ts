import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@core/api.token';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Shift } from '@core/models/shift.model';

@Injectable({ providedIn: 'root' })
export class ShiftsService {

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) {}

  one(id: number): Observable<any> {
    return this.http.get(`${this.api}/shifts/${id}`);
  }

  all(): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${this.api}/shifts`);
  }

  create(payload: Shift): Observable<any> {
    return this.http.post(`${this.api}/shifts`, payload);
  }

  update(id: number, payload: Shift): Observable<any> {
    return this.http.patch(`${this.api}/shifts/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/shifts/${id}`);
  }
}
