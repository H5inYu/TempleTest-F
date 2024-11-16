import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileDTO } from '../../Interface/matchInterface/user-profile';
import { UserProfileDisplayDTO } from './../../Interface/matchInterface/user-profile-display';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'https://localhost:7203/api/UserProfile';

  constructor(private http: HttpClient) { }

  getUserProfile(userId: number): Observable<UserProfileDTO> {
    console.log(`${this.apiUrl}/${userId}`)
    return this.http.get<UserProfileDTO>(`${this.apiUrl}/${userId}`);
  }

  // 更新用戶資料的方法
  updateUserProfile(userId: number, userProfile: UserProfileDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, userProfile);
  }

   // 創建用戶資料的方法
   createUserProfile(userProfile: UserProfileDTO): Observable<UserProfileDTO> {
    return this.http.post<UserProfileDTO>(this.apiUrl, userProfile);
  }

  // 檢查用戶偏好設置的方法
  checkUserPrefer(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/CheckUserPrefer/${userId}`);
  }

  getAllUserProfiles(): Observable<UserProfileDisplayDTO[]> {
    return this.http.get<UserProfileDisplayDTO[]>(`${this.apiUrl}/DisplayAll`);
  }
// 顯示用戶照片的方法
getUserPhoto(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${userId}/photo`);
}

// 上傳用戶照片的方法
uploadUserPhoto(userId: number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('PhotoFile', file); // 名稱必須與後端接收的名稱一致，即 UploadPhoto.PhotoFile

  // formData.append('userId', userId.toString());
  return this.http.post<any>(`${this.apiUrl}/upload-photo/${userId}`, formData);
}

}
