import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../../Service/matchService/user-profile.service';
import { UserProfileDTO } from '../../../Interface/matchInterface/user-profile';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Service/userService/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})

export class MatchEditComponent implements OnInit {
  userPhotoPath?: string = '';
  userId: number = 0;

  action: string = ''; // 添加 action 屬性，並初始化為空字符串
  userProfile: UserProfileDTO = {
    userId: 0,  // 假設你有一個默認的用戶 ID，應根據具體情況進行修改
    userNickName: '', // 新增屬性
    userName: '', // 添加 userName，這個屬性是必需的
    height: null,
    photoPath: '',
    info: '',
    selectedHobbies: [],
    selectedTraits: [],
    // receiveNotifications: false // 添加初始值
  };

  valid: boolean = true;
  heightError: string = '';
  introError: string = '';
  errorMessage: string = '';
  isUpdateMode: boolean = false;

  // 添加 traits 變數，並賦予初始值
  traits: string[] = [
    '領導型', '分析型', '創意型', '關懷型', '務實型',
    '社交型', '探險型', '內省型', '高效規劃型', '實驗型'
  ];

  hobbies: string[] = [
    '藝術/創作', '運動/健身', '音樂/表演', '閱讀/學習',
    '旅行/探險', '美食/烹飪', '科技/遊戲', '社會志願/服務'
  ];


  constructor(
    private router: Router,
    private userProfileService: UserProfileService, // 注入服務
    private cd: ChangeDetectorRef, // 注入 ChangeDetectorRef
    private route: ActivatedRoute,
    private userService: UserService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.userProfile.userId = this.userService.getUserid();
    this.getUserProfile();
    this.loadUserPhoto();
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
    });

    // ================================================
    // this.userProfileService.getUserPhoto(1)
    //   .subscribe({
    //     next: (data) => {
    //     },
    //     error: (data) => {
    //     }
    //   })
    // ================================================

  }

  getUserProfile(): void {
    this.userProfileService.getUserProfile(this.userProfile.userId)
      .subscribe(
        (data) => {
          if (data) {
            this.userProfile = data;
            this.userPhotoPath = data.photoPath;

            // 如果沒有填寫暱稱，則將其設置為用戶本名
            if (!this.userProfile.userNickName || this.userProfile.userNickName.trim() === '') {
              this.userProfile.userNickName = this.userProfile.userName; // 使用用戶本名
            }

            this.userProfile.selectedHobbies = this.userProfile.selectedHobbies || [];
            this.userProfile.selectedTraits = this.userProfile.selectedTraits || [];
            this.isUpdateMode = true; // 正確設置為更新模式
          } else {
            this.userProfile = {
              userId: this.userProfile.userId,
              height: null,
              userNickName: '', // 如果是創建模式，預設暱稱為空
              userName: '', // 需要在後端設置為用戶本名
              photoPath: '',
              info: '',
              selectedHobbies: [],
              selectedTraits: [],
            };
            this.isUpdateMode = false; // 創建模式
          }
          console.log('用戶資料獲取成功', this.userProfile);
          this.cd.detectChanges();
        },
        (error) => {
          console.error('獲取用戶資料失敗', error);
        }
      );
  }

  // 創建或更新用戶資料
  validateUserProfile(): boolean {
    this.valid = true;

    // 驗證身高
    if (this.userProfile.height === null || isNaN(this.userProfile.height)) {
      this.heightError = '身高為必填';
      this.valid = false;
    } else if (this.userProfile.height < 100 || this.userProfile.height > 200) {
      this.heightError = '身高介於100到200公分';
      this.valid = false;
    } else {
      this.heightError = '';
    }

    // 自我介紹驗證
    if ((this.userProfile.info ?? '').trim().length < 10) {
      this.introError = '自我介紹必須超過10個字';
      this.valid = false;
    } else {
      this.introError = '';
    }
    return this.valid;
  }

  saveUserProfile(): void {
    // 執行驗證
    this.valid = this.validateUserProfile();

    // 如果驗證失敗，則返回並顯示錯誤訊息
    if (!this.valid) {
      return;
    }

    if (!this.userProfile.userNickName || this.userProfile.userNickName.trim() === '') {
      this.userProfile.userNickName = '預設暱稱'; // 為空時設置一個默認值
    }

    // 如果資料有效，進行創建或更新操作
    if (this.isUpdateMode) {
      console.log('正在更新會員資料:', this.userProfile);
      // 更新用戶資料
      this.userProfileService.updateUserProfile(this.userProfile.userId, this.userProfile)
        .subscribe({
          next: () => {
            alert('資料更新成功!');
            this.router.navigate(['/match']);
          },
          error: (error) => {
            console.error('更新用戶資料失敗', error);
            alert('更新失敗，請稍後再試');
          }
        });
    } else {
      console.log('正在創建新會員資料:', this.userProfile);
      // 創建新用戶資料
      this.userProfileService.createUserProfile(this.userProfile)
        .subscribe({
          next: (data) => {
            alert('資料創建成功!');
            this.router.navigate(['/match']);
          },
          error: (error) => {
            console.error('創建用戶資料失敗', error);
            alert('創建失敗，請稍後再試');
          }
        });
    }
  }


  navigateToMatch() {
    this.router.navigate(['match']);
  }

  toggleHobby(hobby: string): void {
    if (!this.userProfile.selectedHobbies) {
      this.userProfile.selectedHobbies = [];
    }

    const index = this.userProfile.selectedHobbies.indexOf(hobby);
    if (index === -1) {
      this.userProfile.selectedHobbies.push(hobby);
    } else {
      this.userProfile.selectedHobbies.splice(index, 1);
    }
  }

  toggleTrait(trait: string): void {
    if (!this.userProfile.selectedTraits) {
      this.userProfile.selectedTraits = [];
    }

    const index = this.userProfile.selectedTraits.indexOf(trait);
    if (index === -1) {
      this.userProfile.selectedTraits.push(trait);
    } else {
      this.userProfile.selectedTraits.splice(index, 1);
    }
  }

  getLoggedInUserId(): any {
    return this.userService.getUserid();
  }

  // 從服務器加載用戶照片
  loadUserPhoto(): void {
    this.userProfileService.getUserPhoto(this.userId)
      .subscribe(
        (response) => {
          if (response && response.base64Image) {
            this.userPhotoPath = String(this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${response.base64Image}`));
          } else {
            this.setDefaultPhoto(); // 沒有照片時設置預設照片
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error loading user photo', error);
          this.userPhotoPath = '';
        }
      );
  }
  setDefaultPhoto(): void {
    this.userPhotoPath = 'assets/images/matchImages/user.jpg'; // 預設圖片的相對路徑
  }

  // 當用戶選擇照片時上傳
  // onPhotoSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // 預覽選擇的照片
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.userPhotoPath = e.target.result; // 設置照片預覽路徑
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   console.log(file);
  //   // 使用服務上傳會員的照片
  //   this.userProfileService.uploadUserPhoto(this.userProfile.userId, file)
  //     .subscribe(
  //       (response) => {
  //         console.log('照片上傳成功', response);
  //         this.loadUserPhoto(); // 上傳成功後重新加載新照片
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error('照片上傳失敗', error);
  //       }
  //     );
  // }
  selectedPhoto: File | null = null;
  previewUrl: string | null = null;

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhoto = file;
      // 預覽照片
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imgElement = document.querySelector('.dashboard_sidebar_user .img img') as HTMLImageElement;
        if (imgElement) {
          imgElement.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
