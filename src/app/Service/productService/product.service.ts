import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TProduct } from 'src/app/Interface/productInterface/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7203/api/product';
  constructor(private http: HttpClient) { }

  searchProducts(keyword: string, category: string, minPrice: number, maxPrice: number): Observable<TProduct[]> {
    let params = new HttpParams()
      .set('minPrice', minPrice.toString())
      .set('maxPrice', maxPrice.toString());

    if (keyword) params = params.set('keyword', keyword);
    if (category) params = params.set('category', category);

    return this.http.get<TProduct[]>(this.apiUrl, { params });
  }

  getProducts(): Observable<TProduct[]> {
    return this.http.get<TProduct[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<TProduct> {
    return this.http.get<TProduct>(`${this.apiUrl}/${id}`);
  }
}
