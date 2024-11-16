import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Cart } from 'src/app/Interface/cartInterface/cart';
import { TProduct } from 'src/app/Interface/productInterface/product';
import { CartItem } from 'src/app/Interface/cartInterface/cartItem';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7203/api/cart'; // 替換為伺服器的真實API網址
  private cart = new BehaviorSubject<Cart>({ cartTotal: 0, cartItemDTOs: [] }); // 管理本地購物車資料的 BehaviorSubject
  cart$ = this.cart.asObservable(); // 只讀的可觀察對象

  constructor(private http: HttpClient) {
    this.loadCartItems(); // 初始化購物車資料
  }
  // addToCart(item: CartItem): Observable<any> {
  //   return this.http.post(this.apiUrl, item);
  // }

  // 新增商品到購物車並同步更新 BehaviorSubject
  addToCart(item: CartItem):Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrl, item).pipe(
      tap(() => this.loadCartItems()), // 新增成功後重新加載購物車資料
      catchError(error => {
        console.error('添加到購物車失敗', error);
        throw error;
      })
    );
  }

  // 載入購物車商品列表並更新 BehaviorSubject
  loadCartItems(): void {
    this.http.get<Cart>(this.apiUrl).pipe(
      tap(data => this.cart.next(data)), // 更新 BehaviorSubject
      catchError(error => {
        console.error('獲取購物車資料失敗', error);
        throw error;
      })
    ).subscribe(); // 空的訂閱來啟動操作
  }

  // 從購物車中移除指定商品並同步更新 BehaviorSubject
  removeCartItem(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadCartItems()), // 移除成功後重新加載購物車資料
      catchError(error => {
        console.error('移除購物車商品失敗', error);
        throw error;
      })
    ).subscribe(); // 空的訂閱來啟動操作
  }
  updateQTY(item: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(this.apiUrl, item);
  }
}
