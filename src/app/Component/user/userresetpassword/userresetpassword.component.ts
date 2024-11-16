import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Service/userService/user.service';

@Component({
  selector: 'app-userresetpassword',
  templateUrl: './userresetpassword.component.html',
  styleUrls: ['./userresetpassword.component.css']
})
export class UserresetpasswordComponent implements OnInit {
  token: string = ''; // 從URL取得的token和信箱
  email: string = '';
  newPassword: string = ''; // 會員輸入的新密碼和確認密碼
  confirmPassword: string = '';
  error: string = ''; // 錯誤訊息

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    // 從URL參數中取得token和信箱
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

    // 如果缺少token或信箱，導向登入頁面
    if (!this.token || !this.email) {
      this.router.navigate(['/user/login']);
    }
  }

  // 處理表單提交
  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.error = '與新密碼輸入不符';
      return;
    }

    // 發送重設密碼請求
    this.userService.resetPassword({
      email: this.email,
      token: this.token,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    }).subscribe({
      next: () => {
        // 重設成功，導向登入頁面
        alert('重設密碼完成，請登入');
        this.router.navigate(['/user/login']);
      },
      error: (error) => {
        // 顯示錯誤訊息
        this.error = error.error.message;
      }
    });
  }

}
