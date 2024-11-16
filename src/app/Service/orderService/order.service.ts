import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orderlist } from 'src/app/Interface/orderInterface/order';  // 引入 Orderlist 介面
import { ShoppingCart } from 'src/app/Interface/orderInterface/order';
import { Order } from 'src/app/Interface/orderInterface/order';
import { OrderInfo } from 'src/app/Interface/orderInterface/order';
import { MemberData } from 'src/app/Interface/orderInterface/order';

@Injectable({
  providedIn: 'root'  // 這樣可以在整個應用程式中共享此服務
})
export class OrderService {

  private apiUrl = 'https://localhost:7203';  // 設定您的 API URL，根據需要調整

  constructor(private http: HttpClient) { }

  // 獲取訂單資料的 GET 請求
  // getOrders(): Observable<Orderlist[]> {
  //   return this.http.get<Orderlist[]>(this.apiUrl);  // 返回一個 Observable，讓組件可以訂閱
  // }

  // 根據會員 ID 查詢訂單
  getOrdersByUserId(userId: number, pageNumber: number = 1, pageSize: number = 10): Observable<Orderlist[]> {
    const url = `${this.apiUrl}/api/Order/OrderList/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<Orderlist[]>(url);
  }

  // 購物車資料
  getShoppingCart(): Observable<ShoppingCart> {
    const userId = 124;  // 假設會員 ID 固定為 124
    return this.http.get<ShoppingCart>(`${this.apiUrl}/api/Order/${userId}`);
  }
  // 收件人資料
  placeOrder(orderInfo: OrderInfo): Observable<any> {
    console.log("orderInfo", orderInfo)
    return this.http.post<any>(`${this.apiUrl}/api/Order/SubmitOrder`, orderInfo);
  }

  //清空購物車
  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/Order/${userId}`);
  }

  //訂單明細
  getOrderDetails(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/api/Order/OrderDetail/${orderId}`);
  }

  // 根據會員 ID 獲取會員資料
  getMemberById(id: number): Observable<MemberData> {
    return this.http.get<MemberData>(`${this.apiUrl}/api/Order/member/${id}`);
  }
}
