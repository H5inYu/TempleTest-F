import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
declare var jQuery: any;
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserProfileService } from '../../../Service/matchService/user-profile.service';
import { HttpClient } from '@angular/common/http';
import { InterestRequestDto } from 'src/app/Interface/matchInterface/InterestRequestDto';
import { UserProfileDisplayDTO } from 'src/app/Interface/matchInterface/user-profile-display';
import { UserService } from 'src/app/Service/userService/user.service';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})

export class MatchComponent implements OnInit, AfterViewInit {
  users$: Observable<any[]> = of([]); // 使用 Observable 來監聽後端 API 的資料流
  users: UserProfileDisplayDTO[] = []; // 用於篩選的陣列
  filteredUsers: any[] = []; // 用於顯示篩選結果
  hobbies = [
    '藝術/創作', '運動/健身', '音樂/表演', '閱讀/學習', '旅行/探險',
    '美食/烹飪', '科技/遊戲', '社會志願/服務'
  ];
  traits = [
    '領導型', '分析型', '創意型', '關懷型', '務實型',
    '社交型', '探險型', '內省型', '高效規劃型', '實驗型'
  ];

  showNotification: boolean = false;

  sendHeart(): void {
    this.showNotification = true;

    // 設定通知在 1.5 秒後自動消失
    setTimeout(() => {
      this.showNotification = false;
    }, 1500);
  }
  //分頁
  currentPage: number = 1;
  itemsPerPage: number = 9; // 每頁顯示的卡片數量
  pagesArray: number[] = []; // 用於存放分頁按鈕的頁碼

  selectedUser: any = null; // 被點擊的用戶
  showModal = false; // 控制模態框的顯示


  // 篩選條件
  selectedGender: string = '';
  ageRange: [number, number] = [18, 40];
  heightRange: [number, number] = [140, 200];
  selectedHobbies: string[] = [];
  selectedTraits: string[] = [];

  @ViewChild('sliderRange', { static: false }) sliderRange!: ElementRef;
  @ViewChild('rangeSlider', { static: false }) rangeSlider!: ElementRef;


  // 篩選後的用戶列表
  // filteredUsers = this.users;

  constructor(private router: Router, private userProfileService: UserProfileService, private http: HttpClient,private userService:UserService) { }
  navigateToMatchEdit() {
    this.router.navigate(['/match-edit']);
  }

  ngOnInit(): void {
    this.getUsers(); // 初始化時撈取會員資料
    // this.filterUsers();
  }

  // 從服務中獲取所有用戶資料
  getUsers(): void {
    this.userProfileService.getAllUserProfiles().pipe(
      tap(data => {
        console.log('API Data:', data); // 調試用，檢查獲取到的資料
        this.users = data;
        // this.users = data.map(user => ({
        //   userId: user.userId, // 新增ID屬性以便用於寄信
        //   nickname: user.userNickName,
        //   image: user.base64ImageData,
        //   gender: user.gender,
        //   age: user.age,
        //   height: user.height,
        //   hobbies: user.hobbies,
        //   traits: user.traits,
        //   bio: user.bio ? user.bio : '這個用戶還沒有填寫個人簡介'
        // }));
        this.updatePagination(); // 更新分頁
      })
    ).subscribe(); // 在這裡訂閱
  }

  setGender(gender: string): void {
    this.selectedGender = gender;
    this.filterUsers();
  }

  ngAfterViewInit(): void {
    // 初始化年齡滑桿
    jQuery(this.sliderRange.nativeElement).slider({
      min: 18,
      max: 60,
      values: [18, 60],
      range: true,
      slide: (event: any, ui: any) => {
        this.ageRange = ui.values as [number, number];
        this.filterUsers();
      }
    });

    // 身高滑桿
    jQuery(this.rangeSlider.nativeElement).slider({
      min: 140,
      max: 200,
      values: [140, 200],
      range: true,
      slide: (event: any, ui: any) => { // 使用 `any` 來繞過類型檢查
        this.heightRange = ui.values as [number, number];
        this.filterUsers();
      }
    });
  }

  toggleHobby(hobby: string): void {
    const index = this.selectedHobbies.indexOf(hobby);
    index > -1 ? this.selectedHobbies.splice(index, 1) : this.selectedHobbies.push(hobby);
    this.filterUsers();
  }

  toggleTrait(trait: string): void {
    const index = this.selectedTraits.indexOf(trait);
    index > -1 ? this.selectedTraits.splice(index, 1) : this.selectedTraits.push(trait);
    this.filterUsers();
  }

  //分頁
  filterUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // 保留原來的篩選條件
    const filtered = this.users.filter(user =>
      (this.selectedGender ? user.gender === this.selectedGender : true) &&
      Number(user.age) >= this.ageRange[0] && Number(user.age) <= this.ageRange[1] &&
      Number(user.height) >= this.heightRange[0] && Number(user.height) <= this.heightRange[1] &&
      (this.selectedHobbies.length ? this.selectedHobbies.every(hobby => user.hobbies.includes(hobby)) : true) &&
      (this.selectedTraits.length ? this.selectedTraits.every(trait => user.traits.includes(trait)) : true)
    );

    this.filteredUsers = filtered.slice(startIndex, endIndex); // 僅顯示當前頁數範圍內的用戶
  }

  openModal(user: any): void {
    this.selectedUser = user; // 設置被選中的用戶數據
    this.showModal = true;    // 顯示模態框
  }

  closeModal(): void {
    this.showModal = false;   // 隱藏模態框
  }

  //分頁
  updatePagination(): void {
    const totalPages = this.getTotalPages();
    this.pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.filterUsers(); // 分頁初始化後進行篩選
  }

  getTotalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.filterUsers();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.filterUsers();
  }

  //寄信
  sendEmail(): void {
    console.log(this.selectedUser)
    console.log(this.selectedUser.userId)
    if (this.selectedUser) {
      const emailData: InterestRequestDto = {
        toUserId: this.selectedUser.userId,
        fromUserId: this.getLoggedInUserId(), // 需要根據實際情況填入
      };

      this.http.post('https://localhost:7203/api/email/send-interest', emailData ,{ responseType: 'text' }).subscribe(
        (response) => {
          alert(response); // 正確顯示後端返回的文本響應
        },
        error => {
          console.error('寄信過程中發生錯誤:', error);
          alert('寄信過程中發生錯誤');
        }
      );
    }
  }
  getLoggedInUserId():any{
   return this.userService.getUserid();
  }
}
