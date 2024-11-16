import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../../Service/matchService/user-profile.service';
import { UserService } from 'src/app/Service/userService/user.service';
@Component({
  selector: 'app-match-index',
  templateUrl: './match-index.component.html',
  styleUrls: ['./match-index.component.css']
})
export class MatchIndexComponent {
  isLoading: boolean = false;
  // 籤詩
  isFortuneVisible: boolean = false;
  currentFortune: { text?: string; image?: string } = {};

  fortunes: { text?: string; image?: string }[] = [
    { text: '「山高水遠路漫漫，千里行舟靠雙槳。」' },
    { text: '「月有陰晴圓缺，人有喜樂悲憂。」' },
    { text: '「風雨過後彩虹現，苦盡甘來幸自來。」' },
    { text: '「人間多少事，細思皆命理。」' },
    { text: '「欲速則不達，守心常泰然。」' },
    { text: '「福至心靈自安穩，意靜神清福自來。」' },
    { text: '「前路曲折總有成，心如磐石見光明。」' },
    { text: '「前塵往事隨風逝，今朝把酒迎新客。」' },
    { text: '「他山之石可以攻玉，貴人相助方見光明。」' },
    { text: '「前人種樹後人乘涼，默默耕耘福自長。」' },
    { text: '「MSIT165期末專題發表一定順利!!!」' },
    { image: 'assets/images/matchImages/白爛貓.png' } // 添加圖片的路徑
  ];

  constructor(private userProfileService: UserProfileService, private router: Router, private userService: UserService) { }

  navigateToMatch() {
    this.isLoading = true; // 請求開始，按鈕禁用
    const userId = this.getLoggedInUserId(); // 獲取當前登入會員的 ID

    this.userProfileService.checkUserPrefer(userId).subscribe({
      next: (response) => {
        this.isLoading = false; // 請求結束，按鈕恢復
        // 如果找到了偏好設置（後端返回 200），則導航到匹配頁面
        this.router.navigate(['/match']);
      },
      error: (error) => {
        this.isLoading = false; // 請求結束，按鈕恢復
        // 如果返回 404，表示該用戶尚未設置偏好，需導航到 match-edit 頁面
        if (error.status === 404) {
          this.router.navigate(['/match-edit']);
        } else {
          console.error('發生其他錯誤', error);
        }
      }
    });
  }

  getLoggedInUserId(): any {
    return this.userService.getUserid();
  }

  // 籤詩
  toggleFortune() {
    this.isFortuneVisible = !this.isFortuneVisible;
    if (this.isFortuneVisible) {
      this.drawFortune();
    }
  }

  drawFortune() {
    const randomIndex = Math.floor(Math.random() * this.fortunes.length);
    this.currentFortune = this.fortunes[randomIndex];
  }
}





