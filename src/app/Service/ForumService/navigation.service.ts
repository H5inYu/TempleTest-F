// navigation.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {


    constructor(private router: Router) {
    }

    private navigationSubject = new Subject<string>();
    navigationAction$ = this.navigationSubject.asObservable();

    navigateTo(tag: string) {
        this.router.navigate(['/Forumproduct/1'])
        // this.navigationSubject.next(tag);
    }
}
