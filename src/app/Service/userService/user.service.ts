import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserLogin } from 'src/app/Interface/userInterface/UserLogin';
import { Usersignup } from 'src/app/Interface/userInterface/usersignup';





@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7203/api/TUsers';

  private readonly TOKEN_KEY = 'jwtToken';

  // 新增登入狀態的 BehaviorSubject
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  // 檢查登入狀態
  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('Userid');
  }

  // 儲存token
  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  //取得token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  //登出的方法
  getLogin(){
    this.isLoggedInSubject.next(true);
  }

  //儲存會員id到localsttorage的方法
  saveUserid( Userid : string){
    localStorage.setItem("Userid",Userid)
  }

  //要會員id call這個方法
  getUserid():any{
    return localStorage.getItem("Userid")
  }

  //token登入API
  login(userLogin: UserLogin): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, userLogin)
      .pipe(
        tap(response => {
          if (response.token) {
            this.saveToken(response.token);
            this.saveUserid(response.userId.toString());
            this.isLoggedInSubject.next(true);
          }
        })
      );
  }

  // token註冊API
  register(user: Usersignup): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/signup`, user)
      .pipe(
        tap(response => {
          if (response.token) {
            this.saveToken(response.token);
            this.saveUserid(response.userId.toString());
            this.isLoggedInSubject.next(true);
          }
        })
      );
  }

  // token登出方法
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('Userid');
    this.isLoggedInSubject.next(false);
  }


  //登入API
  // login(userLogin: UserLogin): Observable<any> {
  //   return this.httpClient.post<any>(`${this.apiUrl}/login`, userLogin);
  // }

  // 登出方法
  // logout() {
  //   localStorage.removeItem('Userid');
  //   this.isLoggedInSubject.next(false);
  // }

  //註冊API
  // register(user: Usersignup): Observable<any> {
  //   return this.httpClient.post<any>(`${this.apiUrl}/signup`, user);
  // }

  //驗證信箱API
  verifyEmail(userId: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/verify-email/${userId}`, {});
  }

  //忘記密碼API
  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/forgot-password`, { email });
  }

  //忘記重設密碼API
  resetPassword(resetData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/reset-password`, resetData);
  }
}
