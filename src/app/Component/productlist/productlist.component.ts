import { Component, NgZone, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/productService/product.service';
import { TProduct } from 'src/app/Interface/productInterface/product';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { CartItem } from 'src/app/Interface/cartInterface/cartItem';
import { trigger } from '@angular/animations';

declare var $: any; // 如果使用 jQuery UI 滑動條，需確保 jQuery 已正確引入

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  keyword: string = '';
  selectedCategory: string = '';
  minPrice: number = 0;
  maxPrice: number = 3000;
  products: TProduct[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;

  constructor(private productService: ProductService, private cartService: CartService,private zone: NgZone) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  checkPrice() {
    var priceMin = document.getElementsByClassName('min_value')
    var priceMax = document.getElementsByClassName('max_value')

    // 確保至少有一個元素
    if (priceMin.length > 0) {
      // 取得第一個元素的 textContent
      var textContent = priceMin[0].textContent
      this.minPrice = Number(textContent?.split(' ')[0]);
      // console.log(minPrice1)
    } else {
      console.log("找不到任何 class 名稱為 'min_value' 的元素");
    }
    if (priceMax.length > 0) {
      // 取得第一個元素的 textContent
      var textContent = priceMax[0].textContent
      this.maxPrice = Number(textContent?.split(' ')[0]);
      // console.log(maxPrice);
    } else {
      console.log("找不到任何 class 名稱為 'max_value' 的元素");
    }
    this.searchProductsWithFilters();
  }

  get paginatedProducts(): TProduct[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.calculateTotalPages();
      this.currentPage = 1;
    });
  }

  searchProductsWithFilters(): void {
    this.productService.searchProducts(this.keyword, this.selectedCategory, this.minPrice, this.maxPrice)
      .subscribe((data) => {
        this.products = data;
        this.calculateTotalPages();
        this.currentPage = 1;
      });
  }
  onKeywordSearch(): void {
    this.searchProductsWithFilters(); // 搜尋按鈕點擊時觸發關鍵字搜尋
  }

  onCategoryChange(newCategory: string): void {
    this.selectedCategory = newCategory;
    this.searchProductsWithFilters(); // 類別變動時調用
  }

  triggerMenuCartClick() {
    const menuCartButton = document.getElementById('menuBasketCartButton');
    if (menuCartButton) {
      menuCartButton.click();
    } else {
      console.warn('Element with id "menuBasketCartButton" not found.');
    }
  }

  CurrentProductToItem(product: TProduct): void {
    const cartItem: CartItem = {
      fUserId: 124,
      fCartItemId: 0,
      fProductId: product.fProductId,
      fProductName: product.fProdName,
      fProdSellingPrice: parseFloat(product.fProdPrice),
      fItemQuantity: 1,
      fCartPrice: parseFloat(product.fProdPrice),
      fProdDescription: product.fProdDescription,
      fProdImage: '',
    };
    // 呼叫 CartService 的 addToCart 方法
    this.cartService.addToCart(cartItem)
      .subscribe({
        next: (data) => {
          alert('加入購物車成功');
          this.triggerMenuCartClick();
        },
        error: (data) => {
          alert('加入購物車失敗，請重試');
        }
      });
  }
}



