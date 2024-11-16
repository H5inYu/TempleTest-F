export interface TProduct {
  fProductId: number;            // 產品ID
  fProdName: string;              // 產品名稱
  fProdDescription: string;       // 產品描述
  fProdPrice: string;             // 產品價格（從後端返回為字串）
  fProdStock: number;             // 庫存量
  fProdCategory: string;          // 類別
  fProdCreateAt?: Date | null;    // 建立時間，可為空
  fProdUpdateAt?: Date | null;    // 更新時間，可為空
  fCompanyId?: number | null;     // 公司ID，可為空
  fProdSellingPrice?: number | null; // 銷售價格，可為空
  fProdImage?: string | null;     // 圖片URL，可為空
  fProdStatus?: string | null;    // 產品狀態，可為空
  fProdPromoStartDate?: Date | null; // 促銷開始日期，可為空
  fProdPromoEndDate?: Date | null;   // 促銷結束日期，可為空
  tUserLikes: any[];              // 喜好用戶列表，假設為陣列
}
