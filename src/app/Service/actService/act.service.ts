import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actDetail, ActList, actPagesList, actResponse, actsearch } from '../../Interface/actInterface/ActInterface';
import { Observable } from 'rxjs';
import { ActToReg, RegDetail, RegRequest } from 'src/app/Interface/actInterface/RegDetailInterface';

@Injectable({
  providedIn: 'root'
})
export class ActService {

  constructor(private httpClient: HttpClient) { }

  // api的URL
  private apiUrl = 'https://localhost:7203';

  /**首頁的活動項目 */
  getIndexAct() {
    return this.httpClient.get<ActList[]>(this.apiUrl + '/act/indexAct');
  }

  /**api依據條件、頁數回傳資料列表*/
  getActIndex(para: actsearch) {
    return this.httpClient.get<actPagesList[]>(this.apiUrl + '/act/index', {
      params: {
        FActCategoryId: para.FActCategoryId.toString(),
        txtKeyword: para.txtKeyword,
        targetPage: para.targetPage,
      }
    });
  }

  /**api回傳一活動的細部資料 */
  getActDetail(id: string) {

    return this.httpClient.get<actDetail[]>(`${this.apiUrl}/act/detail/${id}`)
  }

  getRegRecord(actDetailId: string, fuserId: string) {
    return this.httpClient.get<ActToReg>(`${this.apiUrl}/act/RegRecord/${actDetailId}/${fuserId}`)
  }

  /**api將報名的資料post*/
  postActReg(para: RegRequest) {
    return this.httpClient.post<actResponse>(this.apiUrl + '/act/actReg', para);
  }

  getEcpay(para: number): Observable<PaymentResponse> {
    return this.httpClient.post<PaymentResponse>(this.apiUrl + '/act/ecpay', para);
  }
}


