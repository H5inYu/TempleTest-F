import { Component, OnInit } from '@angular/core';
import { DonateService } from 'src/app/Service/orderService/donate.service'; // 確保這是正確的服務路徑
import { Donation } from 'src/app/Interface/orderInterface/donation'; // 確保這是正確的模型路徑
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  donationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private donateService: DonateService
  ) {}

  ngOnInit(): void {
    this.donationForm = this.fb.group({
      fAmount: [0, [Validators.required, Validators.min(1), this.positiveIntegerValidator]],  //設定初始捐款金額為 0 並加入自訂驗證
      fDonationDate: [new Date().toISOString().split('T')[0].replace(/-/g, '')], // 設定初始日期
      fUserId: [124] // 設定預設的使用者 ID
    });
  }

  // 自訂驗證器：檢查是否為正整數
  positiveIntegerValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (Number.isInteger(value) && value > 0) {
      return null;
    }
    return { notPositiveInteger: true };
  }

  onSubmit(): void {
    if (this.donationForm.invalid) {
      alert('請確認捐款金額有效且為正整數');
      return;
    }

    const donation: Donation = this.donationForm.value;
    this.donateService.addDonation(donation).subscribe({
      next: (data) => {
        console.log('Donation successfully added:', data);
        alert('捐款成功！感謝您的支持。');
      },
      error: (error) => {
        console.error('Error adding donation:', error);
        alert('捐款失敗，請稍後再試。');
      }
    });
  }
}
