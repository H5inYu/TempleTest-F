import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPersonelinfoEdit } from 'src/app/Interface/userInterface/userpersonelinfoedit';

@Injectable({
  providedIn: 'root'
})
export class UserpersonelinfoService {

  private apiUrl = 'https://localhost:7203/api/TUsersPersonelinfo';

  constructor(private httpClient: HttpClient) { }

  getUserDetails(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${userId}`);
  }

  updateUserDetails(userId: string, formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/update/${userId}`, formData);
  }


  getUserid():any{
    return localStorage.getItem("Userid")
  }
}
