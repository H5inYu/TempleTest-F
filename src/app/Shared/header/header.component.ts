import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { Cart } from 'src/app/Interface/cartInterface/cart';
import { UserService } from 'src/app/Service/userService/user.service';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/Interface/cartInterface/cartItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: Cart = { cartTotal: 0, cartItemDTOs: [] };

  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // 直接呼叫 loadCartItems 來初始化購物車資料
    this.cartService.loadCartItems();
    // cartItems$ 是 BehaviorSubject，可以即時獲取最新資料
    this.cartService.cart$.subscribe((items: Cart) => {
      this.cart = items;
    });

    // 訂閱登入狀態
    this.userService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    }
    )
  }


  // 登出方法
  logout() {
    this.userService.logout();
    this.router.navigate(['/index']);  // 導航到首頁
  }

  // 新增移除購物車商品的方法
  removeCartItem(id: number): void {
    if (id !== undefined) {
      this.cartService.removeCartItem(id);
    }
  }
  // 增加數量
  incrementQuantity(x: CartItem): void {
    x.fItemQuantity += 1;
    this.quantityChange(x);
  }

  // 減少數量，但確保數量不低於1
  decrementQuantity(x: CartItem): void {
    if (x.fItemQuantity > 1) {
      x.fItemQuantity -= 1;
      this.quantityChange(x);
    }
  }

  quantityChange(x: CartItem) {
    if (x.fItemQuantity > 0) {
      this.cartService.updateQTY(x).subscribe({
        next: (data) => {
          this.cartService.loadCartItems();
        },
        error: (data) => {
        }
      });
    }
    else {
      this.cartService.loadCartItems();
      alert("數量不可小於1");
    }
  }
}
