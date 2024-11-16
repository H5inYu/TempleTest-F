import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from 'src/app/Service/userService/user.service';
import { LoginResponse, UserLogin } from 'src/app/Interface/userInterface/UserLogin';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  email: string = '';
  password: string = '';
  token: string = '';

  emailError: string = '';  // 儲存信箱錯誤訊息
  passwordError: string = '';  // 儲存密碼錯誤訊息

  isLoggedIn = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // 訂閱登入狀態
    this.userService.isLoggedIn$.subscribe(
      status => this.isLoggedIn = status
    );
  }

  onLogin() {

    // 清空之前的錯誤訊息
    this.emailError = '';
    this.passwordError = '';

    const userLogin: UserLogin = {
      FUserEmail: this.email,
      FUserPassword: this.password,
    };

    const userId = this.userService.getToken();

    this.userService.login(userLogin).subscribe({
      next: (response: LoginResponse) => {
        if (response && response.token) {
        console.log('登入成功', response);
        // 儲存用戶ID並更新登入狀態
        this.userService.saveUserid(response.userId.toString());
        this.userService.saveToken(response.token.toString());
        alert('登入成功！');
        this.userService.getLogin();
        this.router.navigate(['/index']);
      } else {
        console.error('回應資料格式不正確', response);
        alert('登入過程發生錯誤，請稍後再試');
      }
      },
      error: (error) => {
        console.error('登入失敗', error);
        if (error.status === 404) {
          this.emailError = '無此電子郵件帳號，請先註冊';
        } else if (error.status === 401) {
          this.passwordError = '您輸入的密碼不正確';
        } else {
          alert('發生未知錯誤，請稍後再試');
        }
      }
  });
  }

  // 登出方法
  onLogout() {
    this.userService.logout();
    this.router.navigate(['/index']);
  }
}
