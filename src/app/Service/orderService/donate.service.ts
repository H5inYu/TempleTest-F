import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donation } from 'src/app/Interface/orderInterface/donation'; // 確保這是正確的模型路徑

@Injectable({
  providedIn: 'root'
})
export class DonateService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7203'; // 確保此 URL 與您的後端 URL 一致

  // 取得捐款紀錄
  getDonations(page: number, pageSize: number): Observable<Donation[]> {
    // 將 page 和 pageSize 參數加到 API 路徑中
    return this.http.get<Donation[]>(`${this.apiUrl}/api/Donate?page=${page}&pageSize=${pageSize}`);
  }

  // 新增捐款紀錄
  addDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${this.apiUrl}/api/Donate`, donation);
  }

}
