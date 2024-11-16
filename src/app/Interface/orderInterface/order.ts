// Order頁
//購物車
export interface CartItem {
  productId: number;         // 商品ID
  prodName: string;          // 商品名稱
  prodSellingPrice: number;  // 商品售價
  quantity: number;          // 購買數量
  price: number;             // 單項商品的總價格（售價 * 數量）
}
export interface ShoppingCart {
  cartItems: CartItem[];     // 購物車項目列表
  totalPrice: number;        // 購物車總價格
}

//收件人資料
// 訂單中的單一商品項目的介面
export interface OrderCartItem {
  productId: number;    // 商品ID
  productName:string;   // 商品名yu
  quantity: number;     // 購買數量
  price: number;        // 商品的價格
}
// 訂單資料
export interface OrderInfo {
  userId: number;               // 會員ID
  recepientName: string;         // 收件人姓名
  recepientAddress: string;      // 收件人地址
  recepientPhone: string;        // 收件人電話
  recepientEmail: string;        // 收件人郵箱
  shippingInfo: string;          // 配送資訊
  paymentInfo: string;           // 支付資訊
  orderRemarks: string;          // 訂單備註
  cartItems: OrderCartItem[];    // 購物車商品列表
}
//代入會員資料
export interface MemberData {
  name: string;
  email: string;
  phone: string;
  address: string;
}



// Orderlist頁
export interface Orderlist {
  orderId: number;
  orderDate: string;
  totalPrice: number;
  paymentStatus: string; // 字串形式的付款狀態
  shippingStatus: string; // 字串形式的配送狀態
  orderStatus: string;

  totalPages: number;
  currentPage: number;
  pageSize: number;
}



// OrderDetail頁
// 商品項目的介面
export interface Product {
  productId: number;        // 商品ID
  prodName: string;         // 商品名稱
  prodSellingPrice: number; // 商品價格
  quantity: number;         // 商品數量
  price: number;            // 商品小計
}

// 訂單的介面
export interface Order {
  userId: number;           // 會員ID
  orderId: number;          // 訂單ID
  orderDate: string;        // 訂單日期
  totalPrice: number;       // 總金額
  products: Product[];      // 商品列表，包含多個商品
  recepientName: string;    // 收件人姓名
  recepientAddress: string; // 收件人地址
  recepientPhone: string;   // 收件人電話
  recepientEmail: string;   // 收件人電子郵件
  shippingInfo: string;     // 配送資訊
  paymentInfo: string;      // 支付資訊
  orderRemarks: string;     // 訂單備註
}

export interface OrderCompleteDto {
  orderId: number;
}

// export interface PaymentConfirmDto {
//   amount: number;
//   currency: string;
// }
