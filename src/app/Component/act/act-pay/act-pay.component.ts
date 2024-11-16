import { Component, OnInit } from '@angular/core';
import { ActService } from 'src/app/Service/actService/act.service';

@Component({
  selector: 'app-act-pay',
  templateUrl: './act-pay.component.html',
  styleUrls: ['./act-pay.component.css']
})
export class ActPayComponent {
  // 這裡的 `htParameters` 是從後端 API 回傳過來的資料
  htParameters: any;
  constructor(private actService: ActService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.regEcpay();
  }
  // regEcpay() {
  //   this.actService.getEcpay().subscribe(
  //     (response: any) => {
  //       console.log('訂單創建成功', response);
  //       // debugger
  //       if (response.errorList.length === 0) {
  //         this.htParameters = response.htParameters;
  //         this.initiatePayment();
  //       } else {
  //         alert("發生錯誤：" + response.errorList.join(', '));
  //       }
  //     },
  //     (error: any) => {
  //       console.error('訂單創建失敗', error);
  //     }
  //   );
  // }
  // initiatePayment() {
  //   // 3. 準備將綠界金流需要的參數傳遞到付款頁面
  //   const formData = new FormData();
  //   Object.keys(this.htParameters).forEach(key => {
  //     formData.append(key, this.htParameters[key]);
  //   });

  //   // 4. 使用 form 提交資料並跳轉
  //   const form = document.createElement('form');
  //   form.method = 'POST';
  //   form.action = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';  // 綠界付款頁 URL

  //   // 把資料填充到表單中
  //   Object.keys(this.htParameters).forEach(key => {
  //     const input = document.createElement('input');
  //     input.type = 'hidden';
  //     input.name = key;
  //     input.value = this.htParameters[key];
  //     form.appendChild(input);
  //   });
  //   document.body.appendChild(form);
  //   form.submit();
  // }
}
