import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/userService/user.service';
import { Usersignup } from 'src/app/Interface/userInterface/usersignup';
import { FormGroup, FormBuilder, Validators, FormArray, NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {

  user: Usersignup = {
    FUserEmail: '',
    FUserPassword: '',
    FUserName: '',
    FUserPhone: ''
  };

  confirmPassword: string = '';
  emailError: string = '';
  confirmPasswordError: string = '';


  constructor(private userService: UserService,  private router: Router) {}


  onSubmit(signupForm: NgForm) {


    // 檢查密碼是否一致
    if (this.user.FUserPassword !== this.confirmPassword) {
      this.confirmPasswordError = '與密碼不相符';
      return;
    }

    // 呼叫 UserService 進行註冊
    this.userService.register(this.user).subscribe(
      response => {
        alert('註冊成功，請至信箱收取驗證信');
        localStorage.setItem('Userid', response.userId);
        this.router.navigate(['/user/personelinfo'])
      },
      (error) => {
        if (error.status === 409) {
          this.emailError = '此信箱已註冊過，請前往登入頁面或按忘記密碼';
        } else {
          alert('註冊失敗，請稍後再試');
        }
      }
    );
  }
}
