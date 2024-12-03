import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SearchResult } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products/search';
  private cache: Map<string, SearchResult> = new Map(); // In-memory cache

  constructor(private http: HttpClient) {}

  getProducts(filter: string): Observable<SearchResult | undefined> {
    const cacheKey = filter.trim().toLowerCase();

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    const url = `${this.baseUrl}?q=${encodeURIComponent(filter)}`;

    return this.http.get<SearchResult>(url).pipe(
      tap((response) => {
        this.cache.set(cacheKey, response);
      })
    );
  }
}
