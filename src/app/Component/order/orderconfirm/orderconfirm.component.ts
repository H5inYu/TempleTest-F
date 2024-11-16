import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orderconfirm',
  templateUrl: './orderconfirm.component.html',
  styleUrls: ['./orderconfirm.component.css']
})

export class OrderconfirmComponent implements OnInit {
  private baseLoginPayUrl: string = 'https://localhost:7203/api/Linepay/';
  transactionId: string | null = null;
  orderId: string | null = null;
  amount: number = 0;
  currency: string = 'TWD';
  // paymentStatus: string = "交易狀態 : 交易已授權，等待確認";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // 取出 query parameters 中的 transactionId 和 orderId
    this.transactionId = this.route.snapshot.queryParamMap.get('transactionId');
    this.orderId = this.route.snapshot.queryParamMap.get('orderId');
    // 從 localStorage 中取出 amount 和 currency
    this.amount = localStorage.getItem('amount') ? parseInt(localStorage.getItem('amount')!) : 0;
    this.currency = localStorage.getItem('currency') || 'TWD';
    console.log('Transaction ID:', this.transactionId);
    console.log('Order ID:', this.orderId);
  }

  confirmPayment(): void {
    const payment = {
      amount: this.amount,
      currency: this.currency,
    };

    // 發送確認交易請求
    this.http
      .post<any>(`${this.baseLoginPayUrl}Confirm?transactionId=${this.transactionId}&orderId=${this.orderId}`, payment)
      .subscribe({
        next: (res) => {
          // this.paymentStatus = "交易狀態 : 成功";
          // this.router.navigate(['/payment-success']);
          // console.log(res);
          // 使用 Router 導向帶有參數的路由
          this.router.navigate(['/ordercomplete', this.orderId]);
          // setTimeout(() => {
          //   this.router.navigate(['/products']);
          // }, 2000);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}

