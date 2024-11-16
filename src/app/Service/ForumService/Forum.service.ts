// navigation.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {


    constructor(private router: Router, private http: HttpClient) {
    }
    apiUrl = 'https://localhost:7203/'

    private navigationSubject = new Subject<string>();
    navigationAction$ = this.navigationSubject.asObservable();

    // GET 請求範例
    posts(): Observable<any> {
        return this.http.get<any>(this.apiUrl+'api/Posts');
    }

    // POST 請求範例
    postData(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, data);
    }
    navigateTo(tag: string) {
        this.router.navigate(['/Forumproduct/1'])
        // this.navigationSubject.next(tag);
    }
}
