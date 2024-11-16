import { ActivatedRoute, Router } from '@angular/router';
import { Component, Renderer2 } from '@angular/core';
import { ActToReg, RegRequest } from '../../../Interface/actInterface/RegDetailInterface';
import { ActService } from 'src/app/Service/actService/act.service';
import { actDetail } from 'src/app/Interface/actInterface/ActInterface';
import { UserService } from 'src/app/Service/userService/user.service';


@Component({
  selector: 'app-act-reg',
  templateUrl: './act-reg.component.html',
  styleUrls: ['./act-reg.component.css']
})
export class ActRegComponent {
  fRegId: number | undefined;
  constructor(private route: ActivatedRoute,
    private actService: ActService,
    private router: Router,
    private renderer: Renderer2, //用來重新載入script
    private userService: UserService,
  ) { }

  Regnum: number = 1;
  count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  errnumber: string = '';
  actDetail: actDetail | undefined;
  actid = undefined;
  regList = Array.from({ length: 1 }, () => ({
    fRegName: '',
    fRegTel: '',
    fRegEmail: '',
    fRecipientAddress: '',
  }));
  // regCount = 0;
  actDetailId: string = '';
  fRegFee: string = '請洽管理人員';
  actfee: string = '請洽管理人員';
  actDateString = '';
  isEmpty = false;
  mailError = false;
  telError = false;
  showBox = false;
  saveSuccess = false;
  htParameters: any;//綠界參數
  private mobileRegex = /^09\d{8}$/;
  private landlineRegex = /^(0[2-9])-\d{6,8}$/;
  private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  ngOnInit(): void {
    // this.loadScript();

    this.route.params.subscribe(params => {
      this.actid = params['id'];
      this.actDetailId = params['selectFActDetailId'];
    });
    // debugger
    if (this.actid) {
      this.readRegRecord(this.actDetailId, (this.userService.getUserid() ?? 124)); // 根據 ID 獲取資料
    }
  }

  /**控制表格數 */
  addform() {
    // debugger
    if (this.Regnum > 10) {
      this.errnumber = "單筆報名人數上限10";
    }
    else {
      this.errnumber = "";
      while (this.Regnum != (this.regList.length)) {
        if (this.Regnum > (this.regList.length)) {
          this.regList.push(
            {
              fRegName: '',
              fRegTel: '',
              fRegEmail: '',
              fRecipientAddress: '',
            }
          );
        }
        if (this.Regnum < (this.regList.length)) {
          this.regList.pop();
        }
      }
      // this.regCount = this.Regnum - 1;
    }
    if (this.actDetail?.fRegFee) {
      this.fRegFee = `${new Intl.NumberFormat().format(this.actDetail.fRegFee * this.Regnum)}元`;
    }
  }

  /**api取活動資料 */
  readRegRecord(actDetailId: string, fuserId: string) {
    // debugger
    this.actService.getRegRecord(actDetailId, fuserId).subscribe((data: ActToReg) => {
      // debugger
      this.actDetail = data.actDetail[0];
      while (data.regDetail.length != this.regList.length) {
        if (data.regDetail.length > (this.regList.length)) {
          this.regList.push(
            {
              fRegName: '',
              fRegTel: '',
              fRegEmail: '',
              fRecipientAddress: '',
            }
          );
        }
      }
      this.Regnum = this.regList.length
      this.regList = data.regDetail;
      this.actDateString = `活動日期 : ${this.actDetail.actDetailDate[0].dates}`
      // debugger
      if (this.actDetail.fRegFee) {
        this.actfee = `${new Intl.NumberFormat().format(this.actDetail.fRegFee)}元/人`;
        this.fRegFee = `${new Intl.NumberFormat().format(this.actDetail.fRegFee * this.Regnum)}元`;
      }
      if (this.actDetail.fRegFee === 0) {
        this.actfee = '0';
        this.fRegFee = "免費";
      }
    })
  }

  /**API存資料庫，並跳轉首頁 */
  saveToIndex() {
    debugger
    let regRequest: RegRequest = {
      fActDetailId: parseInt(this.actDetailId) ?? 0,
      // FActId: this.actid ?? 0,
      fRegFee: isNaN(Number(this.actfee)) ? 0 : Number(this.actfee),
      totalAmount: isNaN(Number(this.fRegFee)) ? 0 : Number(this.fRegFee),
      fActDetailIdIndex: Number(this.actDetailId) + 1,
      regDetail: this.regList,
      fUserId: this.userService.getUserid() ?? 124,
    }
    this.actService.postActReg(regRequest).subscribe(Response => {
      if (regRequest) {
        this.router.navigate(['act', 'index']);
      }
      else {
        alert('儲存失敗，請稍後再嘗試');
        this.router.navigate(['act', 'index']);
      }
    });
  }

  /** 資料驗證-電話*/
  validateTel(para: string) {
    return (this.mobileRegex.test(para) || this.landlineRegex.test(para))
  };
  /** 資料驗證-空值*/
  validateEmpty(para: any) {
    return (para != null && para != undefined && para != "");
  };
  /** 資料驗證-信箱*/
  validateEmail(para: string) {
    return (this.emailRegex.test(para));
  };

  /**資料驗證 */
  checkData() {
    this.regList.forEach((item, index) => {
      this.telError = this.validateTel(item.fRegTel);
      this.isEmpty = (this.validateEmpty(item.fRecipientAddress) &&
        this.validateEmpty(item.fRegEmail) &&
        this.validateEmpty(item.fRegName) &&
        this.validateEmpty(item.fRegTel));
      this.mailError = this.validateEmail(item.fRegEmail);
      // console.log(this.telError, this.isEmpty, this.mailError);
    });
    // debugger
    this.showBox = this.telError && this.isEmpty && this.mailError
    // debugger
    // this.saveData();
  }

  /**加載失效的script */
  loadScript() {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/act-script.js'; // 指向正確的路徑
    script.onload = () => {
      console.log('Script loaded successfully.');
    };
    script.onerror = () => {
      console.error('Error loading script.');
    };
    this.renderer.appendChild(document.body, script);
  }

  element = document.getElementById('exampleModal');

  /**api存DB & ECpay付款 */
  saveToPay() {
    // this.router.navigate(['act', 'reg', this.actDetail?.fActId]);
    // console.log(this.regList)
    debugger
    let regRequest: RegRequest = {
      fActDetailId: parseInt(this.actDetailId) ?? 0,
      fRegFee: isNaN(Number(this.actfee)) ? 0 : Number(this.actfee),
      totalAmount: isNaN(Number(this.fRegFee)) ? 0 : Number(this.fRegFee),
      fActDetailIdIndex: Number(this.actDetailId) + 1,
      regDetail: this.regList,
      fUserId: this.userService.getUserid() ?? 124,
    }
    debugger
    /**存資料庫 */
    this.actService.postActReg(regRequest).subscribe(resp => {
      // console.log(resp);
      // console.log(typeof (resp));
      // debugger
      if (resp.status === "complete") {

        this.router.navigate(['act', 'okpay', `actReg${resp.data}`]).then(() => {
          window.location.reload();
        });
      }

      else if (resp.status === "success") {
        this.fRegId = parseInt(resp.data);
        /**ECpay */
        this.actService.getEcpay(this.fRegId!).subscribe(
          (response: any) => {
            console.log('訂單創建成功', response);
            // debugger
            if (response.errorList.length === 0) {
              this.htParameters = response.htParameters;
              this.initiatePayment();
            } else {
              alert("發生錯誤：" + response.errorList.join(', '));
            }
          },
          (error: any) => {
            console.error('訂單創建失敗', error);
          }
        );
        this.showBox = false;
      }
      else {
        alert('儲存失敗，請稍後再嘗試');
        // this.router.navigate(['act', 'index']);
      }
    });
  }

  initiatePayment() {
    // 3. 準備將綠界金流需要的參數傳遞到付款頁面
    const formData = new FormData();
    Object.keys(this.htParameters).forEach(key => {
      formData.append(key, this.htParameters[key]);
    });

    // 4. 使用 form 提交資料並跳轉
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';  // 綠界付款頁 URL

    // 把資料填充到表單中
    Object.keys(this.htParameters).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = this.htParameters[key];
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  }
}
