import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/userService/user.service';

@Component({
  selector: 'app-user-forgotpassword',
  templateUrl: './user-forgotpassword.component.html',
  styleUrls: ['./user-forgotpassword.component.css']
})
export class UserForgotpasswordComponent {
  email: string = ''; // 會員輸入的信箱
  message: string = ''; // 顯示給會員的訊息

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

   // 處理表單提交
  onSubmit() {
    this.userService.forgotPassword(this.email).subscribe({
      next: (response) => {
        // 顯示成功訊息
        this.message = response.message;
      },
      error: (error) => {
        if (error.status === 404) {
          // 信箱未註冊，導向註冊頁面
          alert('此信箱未註冊，請先註冊會員');
          this.router.navigate(['/user/signup']);
        } else {
          // 顯示其他錯誤訊息
          this.message = error.error.message;
        }
      }
    });
  }

}
