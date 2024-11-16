import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserPersonelinfo } from 'src/app/Interface/userInterface/userpersonelinfo';
import { UserPersonelinfoEdit } from 'src/app/Interface/userInterface/userpersonelinfoedit';
import { UserpersonelinfoService } from 'src/app/Service/userService/userpersonelinfo.service'
import { UserService } from 'src/app/Service/userService/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-personelinfo',
  templateUrl: './user-personelinfo.component.html',
  styleUrls: ['./user-personelinfo.component.css']
})
export class UserPersonelinfoComponent implements OnInit {

    // 顯示用的不可修改的用戶信息
    user: UserPersonelinfo = {
      fUserEmail: '',
      fUserName: '',
      fUserPhone: '',
      fUserGender: null as boolean | null,
      fUserAddress: '',
      fUserBirthdate: '',
      fUserNickName: '',
      fUserState: '',
      fUserStateId: 2,
      fUserImage: '',
    };

    // 編輯用的可修改的用戶信息
    useredit: UserPersonelinfoEdit = {
      fUserName: '',
      fUserPhone: '',
      fUserGender: true,
      fUserAddress: '',
      fUserBirthdate: '',
      fUserNickName: '',
    };

    originalUser: UserPersonelinfoEdit | null = null;

    constructor(
      private route: ActivatedRoute,
      private userpersonelinfoService: UserpersonelinfoService,
      private userService: UserService,
      private renderer: Renderer2, //用來重新載入script
    ) { }

    ngOnInit(): void {
      this.loadUserData();
    }

    private loadUserData(): void {
      const userId = this.userpersonelinfoService.getUserid();
      if (userId) {
        const urlParams = new URLSearchParams(window.location.search);
        const needVerify = urlParams.get('verify') === 'true';

        if (needVerify) {
          this.userService.verifyEmail(userId).subscribe({
            next: () => {
              alert("已驗證成功，請填寫基本資料");
              this.loadUserDetails(userId);
            },
            error: (error) => {
              console.error('驗證失敗:', error);
              this.loadUserDetails(userId);
            }
          });
        } else {
          this.loadUserDetails(userId);
        }
      }
    }

    private loadUserDetails(userId: string): void {
      this.userpersonelinfoService.getUserDetails(userId).subscribe({
        next: (data: UserPersonelinfo) => {
          this.user = data;
        },
        error: (error) => {
          console.error('Error fetching user details:', error);
        }
      });
    }

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

    onSave(): void {
      const userId = this.userpersonelinfoService.getUserid();
      if (!userId) return;

      const formData = new FormData();
      formData.append('FUserName', this.user.fUserName);
      formData.append('FUserPhone', this.user.fUserPhone);
      formData.append('FUserGender', this.user.fUserGender === null ? '' : this.user.fUserGender.toString());
      formData.append('FUserAddress', this.user.fUserAddress || '');
      formData.append('FUserBirthdate', this.user.fUserBirthdate || '');
      formData.append('FUserNickName', this.user.fUserNickName || '');

      if (this.selectedPhoto) {
        formData.append('Photo', this.selectedPhoto);
      }

      this.userpersonelinfoService.updateUserDetails(userId, formData).subscribe({
        next: (response) => {
          if (response.photoPath) {
            this.user.fUserImage = response.photoPath;
          }
          alert('資料已成功更新');
        },
        error: (error) => {
          console.error('Error updating user details:', error);
          alert('更新失敗，請稍後再試');
        }
      });
    }

    onCancel(): void {
      this.previewUrl = null;
      this.selectedPhoto = null;
      this.loadUserData();
    }

    // 如果需要載入外部腳本，建議使用 Angular 的生命週期鉤子
    ngAfterViewInit(): void {
      this.loadScript();
    }

    private loadScript(): void {
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/act-script.js';
      script.onload = () => {
        console.log('Script loaded successfully.');
      };
      script.onerror = () => {
        console.error('Error loading script.');
      };
      this.renderer.appendChild(document.body, script);
    }

    test(e:any){
      // debugger
      console.log(e.target.value);
      console.log(this.user.fUserGender);
      this.getSelectValue()
    }

    getSelectValue() {

      const spanElement = document.getElementById('select2-FUserGender-container') as HTMLSpanElement;
      const value = spanElement.textContent;
      console.log('選取的值:', value);
    }


    onGenderChange(value: boolean | null) {
      console.log('性別已更改為:', value);

      // 如果需要額外處理邏輯
      if (value !== null) {
        // value 為 true 時是男性
        // value 為 false 時是女性
        const genderText = value ? '男' : '女';
        console.log('性別文字:', genderText);
      }
    }
}


