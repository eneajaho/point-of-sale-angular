import { Inject, Injectable } from '@angular/core';
import { Product, ProductDetails } from '../models/product.model';
import { Pagination } from '../models/pagination.model';
import { ProductsFilter } from '../models/products-filter.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, tap } from 'rxjs/operators';
import { createParamsFromObject } from '../utils/create-params-from-object';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@core/api.token';


export interface ProductsState {
  data: Product[];
  pagination: Pagination;
  filters: ProductsFilter | null;
  error: string | null;
  loading: boolean;
  loaded: boolean;
}

const initialState: ProductsState = {
  data: [],
  pagination: { pageSize: 10, pageIndex: 0, total: 0 },
  filters: null,
  error: null,
  loading: false,
  loaded: false
};


@Injectable({ providedIn: 'root' })

export class ProductService {

  private readonly state = new BehaviorSubject<ProductsState>(initialState);
  readonly state$ = this.state.asObservable().pipe(distinctUntilChanged());

  get currentState(): ProductsState {
    return this.state.getValue();
  }

  constructor(private http: HttpClient, @Inject(API_URL) private api: string) {
  }

  getProducts(
    filters: Partial<ProductsFilter> = {},
    pagination: Pagination
  ): Observable<any> {

    const path = `${ this.api }/products`;
    const params = createParamsFromObject(filters)
      .append('page', pagination.pageIndex + '')
      .append('pageSize', pagination.pageSize + '');

    return this.http.get<any>(path, { params });
  }

  private setData(data: Product[], pagination: Pagination): void {
    this.state.next({
      ...this.currentState, data, pagination,
      loading: false, loaded: true, error: null,
    });
  }

  private setError(error: string): void {
    this.state.next({
      ...this.currentState, error,
      loading: false, loaded: true, data: []
    });
  }

  loadProducts(filters?: ProductsFilter, pagination?: Partial<Pagination>): Observable<any> {
    const currentPagination = this.currentState.pagination;
    const newPagination = pagination ? { ...currentPagination, ...pagination } : currentPagination;
    const newFilters = filters ?? this.currentState.filters;

    this.state.next({
      ...this.currentState,
      filters: newFilters,
      pagination: newPagination,
      loading: true, error: null, loaded: false
    });
    // const {pageSize, pageIndex} = this.currentState.pagination;

    return this.getProducts(this.currentState.filters ?? {}, this.currentState.pagination).pipe(
      tap(
        (res) => {
          const samplePagination: Pagination = { pageSize: +res.per_page, pageIndex: res.current_page, total: res.total };

          return this.setData(res.data, samplePagination);
        }
      ),
      catchError(error => {
        this.setError('An error has occurred. Please try again later!');
        return of(error);
      })
    );
  }

  getById(id: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`${ this.api }/products/${ id }`);
  }

  createProduct(value: any): Observable<Product> {
    const path = `${ this.api }/products`;
    return this.http.post<Product>(path, value);
  }

  updateProduct(id: number, body: any): Observable<Product> {
    const path = `${ this.api }/products/${ id }`;
    return this.http.patch<Product>(path, body);
  }
}
