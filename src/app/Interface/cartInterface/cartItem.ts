export interface CartItem {
  fCartItemId: number;
  fProductId: number;
  fCartPrice: number; // 單個項目的小計金額 (price * quantity)
  fProductName: string;
  fProdSellingPrice: number;
  fItemQuantity: number;
  fProdDescription: string;
  fProdImage : string;
  fUserId : number;
}
