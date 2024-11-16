import { Component, OnInit } from '@angular/core';
import { Orderlist } from 'src/app/Interface/orderInterface/order';  // 引入 Orderlist 介面
import { OrderService } from 'src/app/Service/orderService/order.service';  // 引入 OrderService


@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  orders: Orderlist[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const userId = 124;
    this.orderService.getOrdersByUserId(userId, this.currentPage, this.pageSize).subscribe(
      (data) => {
        this.orders = data;
        // 更新總頁數
        if (data.length > 0) {
          this.totalPages = data[0].totalPages;  // 假設 totalPages 在第一個項目上
        }
      },
      (error) => {
        console.error('取得訂單資料失敗', error);
      }
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadOrders();  // 更新資料
    }
  }

  // 用於判斷付款狀態
  getPaymentStatusClass(paymentStatus: string): string {
    return paymentStatus === 'True' || paymentStatus === 'true' ? 'complete' : 'cancel';
  }

  // 用於判斷配送狀態
  getShippingStatusClass(shippingStatus: string): string {
    return shippingStatus === 'True' || shippingStatus === 'true' ? 'complete' : 'cancel';
  }
}
