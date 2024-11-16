import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:7203/api/payment'; // 後端 API URL

  constructor(private http: HttpClient) {}

  // 初始化付款
  initializePayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/initialize`, paymentData);
  }

  // 確認付款
  confirmPayment(transactionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm`, { transactionId });
  }
}
