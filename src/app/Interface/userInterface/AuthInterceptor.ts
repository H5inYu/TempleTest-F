import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 假設 JWT 存儲在 localStorage 中，並且鍵名為 'jwtToken'
    const token = localStorage.getItem('jwtToken');

    // 如果 token 存在，克隆這個請求並添加新的 Authorization 標頭
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    // 如果 token 不存在，直接繼續處理原始請求
    return next.handle(req);
  }
}
