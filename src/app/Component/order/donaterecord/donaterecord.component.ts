import { Component, OnInit } from '@angular/core';
import { Donation } from 'src/app/Interface/orderInterface/donation'; // 確保這是正確的模型路徑
import { DonateService } from 'src/app/Service/orderService/donate.service';// 確保這是正確的服務路徑

@Component({
  selector: 'app-donaterecord',
  templateUrl: './donaterecord.component.html',
  styleUrls: ['./donaterecord.component.css']
})
export class DonaterecordComponent implements OnInit {
  donations: Donation[] = []; // 使用模型
  currentPage: number = 1; // 當前頁數
  totalPages: number = 1;   // 總頁數
  donationsPerPage: number = 5; // 每頁顯示的數量
  donation: Donation = {
    fDonationId: 0,          // 初始化捐款 ID
    fAmount: 0,              // 初始化金額
    fDonationDate: '',       // 初始化捐款日期，空字串代表尚未設定
    fUserId: 124           // 預設為會員 ID 124
  };

  constructor(private donateService: DonateService) { }

  ngOnInit() {
    this.fetchDonations();
  }

  fetchDonations() {
    this.donateService.getDonations(this.currentPage, this.donationsPerPage) // 加入分頁參數
      .subscribe({
        next: (data: any) => { // 假設後端回傳 Donation[] 型別

          // data.map(e=>e.fAmount);
          // 轉換日期字串為 Date 物件
          this.donations = data.donations.map((donation: Donation) => {
            donation.fDonationDate = this.convertToDate(donation.fDonationDate).toISOString(); // 轉換為 ISO 字串
            return donation;
          });

          // 篩選出會員 ID 為 124 的捐款紀錄(後端有寫了)
          //this.donations = this.donations.filter((donation: Donation) => donation.fUserId === 124);

          // 若後端提供了分頁資料
          this.totalPages = data.totalPages; // 如果後端回傳了總頁數，記得更新
        },
        error: (error) => {
          console.error('Error fetching donations', error); // 處理錯誤
        },
        complete: () => {
          console.log('Donation fetching complete'); // 完成的回調
        }
      });
  }

  // 分頁按鈕的點擊事件
  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchDonations(); // 重新獲取捐款紀錄
    }
  }

  convertToDate(dateStr: string): Date {
    // 假設日期格式為 "yyyyMMdd" (例如 "20241106")
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // JavaScript 中月份是從 0 開始的
    const day = parseInt(dateStr.substring(6, 8), 10);

    return new Date(year, month, day); // 返回 Date 物件
  }

  onSubmit() {
    this.donateService.addDonation(this.donation)
      .subscribe({
        next: (data) => {
          console.log('Donation added:', data);
          this.fetchDonations(); // 重新獲取捐款紀錄以更新列表
        },
        error: (error) => {
          console.error('Error adding donation', error); // 處理錯誤
        }
      });
  }
}
