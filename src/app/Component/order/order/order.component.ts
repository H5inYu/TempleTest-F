import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Service/orderService/order.service';  // 引入 OrderService
import { ShoppingCart } from 'src/app/Interface/orderInterface/order';
import { OrderInfo, OrderCompleteDto, MemberData } from 'src/app/Interface/orderInterface/order';  // 引入

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  shoppingCart: ShoppingCart | null = null;  // 用來保存購物車資料
  userId: number = 124;  // 假設的會員ID，實際應從登入系統中獲得
  recepientName: string = '';
  recepientAddress: string = '';
  recepientPhone: string = '';
  recepientEmail: string = '';
  shippingInfo: string = '黑貓宅急便';
  paymentInfo: string = '貨到付款';  // 預設是貨到付款
  orderRemarks: string = '';

  orderId: number = 0;  // 訂單編號

  //代入會員
  memberData: MemberData = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
  isSameAsMember: boolean = false;

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchMemberData(124); // 初始化會員資料

    // 透過 ActivatedRoute 取得訂單編號
    this.route.paramMap.subscribe(params => {
      this.orderId = +params.get('orderId')!;  // 從路由參數中獲取 orderId
      console.log('orderId');  // 你可以在這裡檢查 orderId
    });


    // 取得購物車資料
    this.orderService.getShoppingCart().subscribe(
      (data) => {
        this.shoppingCart = data;
      },
      (error) => {
        console.error('取得購物車資料失敗', error);
      }
    );
  }

  submitOrder(): void {
    if (!this.shoppingCart || this.shoppingCart.cartItems.length === 0) {
      alert('購物車沒有商品');
      return;
    }

    // 準備訂單資料
    const orderData: OrderInfo = {
      userId: this.userId,
      recepientName: this.recepientName,
      recepientAddress: this.recepientAddress,
      recepientPhone: this.recepientPhone,
      recepientEmail: this.recepientEmail,
      shippingInfo: this.shippingInfo,
      paymentInfo: this.paymentInfo,
      orderRemarks: this.orderRemarks,
      cartItems: this.shoppingCart.cartItems.map(item => ({
        productId: item.productId,
        productName: item.prodName,
        quantity: item.quantity,
        price: item.prodSellingPrice, //單價yu
      }))
    };

    // 呼叫服務提交訂單
    this.orderService.placeOrder(orderData).subscribe(
      (response) => {
        //   console.log('訂單提交成功', response);
        //   // 成功提交後清空購物車
        //   this.orderService.clearCart(this.userId).subscribe(
        //     () => console.log("購物車已清空"),
        //     (error) => console.error("清空購物車時發生錯誤", error)
        //   );
        //   // 跳轉至訂單完成頁，並帶上訂單編號
        //   this.router.navigate(['/ordercomplete', response.orderId]);
        // },
        // (error) => {
        //   console.error('訂單提交失敗', error);
        //}
        console.log('訂單提交成功', response);
        // 將訂單資料存入 localStorage  
        // 後端要回傳至少底下這三個
        localStorage.setItem('orderId', response.orderId.toString());
        localStorage.setItem('amount', response.info.amount.toString());
        localStorage.setItem('currency', response.info.currency);
        
        // 提交訂單後清空購物車
        this.orderService.clearCart(this.userId).subscribe(
          () => {
            console.log("購物車已清空");
            // 跳轉至訂單完成頁，並帶上訂單編號
            // this.router.navigate(['/ordercomplete', response.orderId]).then(() => {
            //   // 刷新頁面
            //   window.location.reload();
            // });
          },
          (error) => {
            console.error("清空購物車時發生錯誤", error);
          }
        );
        // 跳轉至訂單完成頁，並帶上訂單編號
        console.log(response.paymentUrl);
        console.log(response["paymentUrl"]);
        const redirectUrl = response.info.paymentUrl.web;
        console.log(redirectUrl);
        window.location.href = redirectUrl;
      },
      (error) => {
        console.error('訂單提交失敗', error);
      }
    );
  }

  //代入會員資料
  fetchMemberData(id: number): void {
    this.orderService.getMemberById(id).subscribe(
      (data) => {
        this.memberData = data;  // 賦值會員資料
        console.log('會員資料:', this.memberData);
      },
      (error) => {
        console.error('獲取會員資料錯誤:', error);
      }
    );
  }

  // 當勾選框狀態改變時，根據狀態來填充或清除資料
  onCheckboxChange(): void {
    if (this.isSameAsMember) {
      // 將 memberData 賦值給表單欄位
      this.recepientName = this.memberData.name;
      this.recepientEmail = this.memberData.email;
      this.recepientPhone = this.memberData.phone;
      this.recepientAddress = this.memberData.address;
    } else {
      // 清空表單欄位
      this.clearForm();
    }
  }

  // 清除表單資料
  clearForm(): void {
    this.recepientName = '';
    this.recepientEmail = '';
    this.recepientPhone = '';
    this.recepientAddress = '';
  }


  //信用卡
  // isCreditCardVisible = false;

  // toggleCreditCardInfo(paymentMethod: string) {
  //   this.isCreditCardVisible = paymentMethod === 'credit';
  //   console.log("信用卡訊息顯示狀態:", this.isCreditCardVisible);
  // }
}

