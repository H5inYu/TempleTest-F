import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actDetail } from 'src/app/Interface/actInterface/ActInterface';
import { ActService } from 'src/app/Service/actService/act.service';
import { UserService } from 'src/app/Service/userService/user.service';

@Component({
  selector: 'app-act-detail',
  templateUrl: './act-detail.component.html',
  styleUrls: ['./act-detail.component.css']
})
export class ActDetailComponent implements OnInit {
  selectFActDetailId: any;
  constructor(private route: ActivatedRoute,
    private actService: ActService,
    private userService: UserService,
    private router: Router) { }

  actDetail: actDetail | undefined;
  actfee: string = '請洽管理員';
  selectedDate: number | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log(id) // 獲取路由中的 ID
    // debugger
    if (id) {
      this.ActDetail(id); // 根據 ID 獲取資料
    }
    // this.selectedDetailId = this.actDetail?.actDetailDate[0].FActDetailId;
  }

  ActDetail(id: string) {
    this.actService.getActDetail(id).subscribe((data: actDetail[]) => {
      this.actDetail = data[0]
      // console.log(data);
      if (this.actDetail.fRegFee) {
        this.actfee = `$${this.actDetail.fRegFee}元/人`
      }
      if (this.actDetail.fRegFee == 0) {
        this.actfee = '免費';
      }
    })
  }

  routingReg() {
    // debugger
    let actIndex = this.selectedDate ?? 0
    if (this.selectedDate) {
      this.selectFActDetailId = this.actDetail?.actDetailDate[actIndex].fActDetailId;
      // console.log(this.selectedDate);
      // console.log(this.selectFActDetailId);
      this.router.navigate(['act', 'reg', this.actDetail?.fActId, this.selectFActDetailId]);
    }


  }
}
