import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient) {}

  //* get user info
  getUserInfo(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/users`);
  }
}
