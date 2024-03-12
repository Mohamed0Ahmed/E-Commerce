import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient) {}

  //* get user info
  updateUserData(userData: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      userData
    );
  }
  //* get user info
  addAddress(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/addresses`,
      userData
    );
  }
  //* get user addresss
  getAddresss(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/addresses`
    );
  }
  //* remove user addresss
  removeAddress(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/addresses/${id}`
    );
  }
  //* update user pass
  updataPass(userData: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      userData
    );
  }
}
