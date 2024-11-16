import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Service/orderService/order.service';  // 引入 OrderService
import { Order } from 'src/app/Interface/orderInterface/order';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  orderId: number | undefined; // 設為 undefined
  orderData: Order | undefined; // 設為 undefined

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    // 從路由中獲取 orderId
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));

    // 根據 orderId 獲取訂單資料
    this.orderService.getOrderDetails(this.orderId).subscribe(
      data => {
        this.orderData = data;
      },
      error => {
        console.error("無法取得訂單資料", error);
      }
    );
  }

  //匯出csv
  exportToCSV() {
    if (!this.orderData?.products) return; // 如果沒有商品資料，則不匯出

    const csvData = this.ConvertToCSV(this.orderData.products, ['prodName', 'prodSellingPrice', 'quantity', 'price']);
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'order_details.csv';
    link.click();
  }

  ConvertToCSV(objArray: any[], headerList: string[]) {
    let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '商品名稱, 商品價格, 商品數量, 小計'; // 加入自定義欄位名稱
    row += '\r\n'; // 結束標題行
    str += row;

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in headerList) {
        let head = headerList[index];
        line += array[i][head] + ',';
      }
      str += line.slice(0, -1) + '\r\n'; // 去掉多餘的逗號
    }
    return str;
  }
}

