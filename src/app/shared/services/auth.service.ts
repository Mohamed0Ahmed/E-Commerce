import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  Dataaa: any;
  //* to decode token
  saveUserData() {
    if (localStorage.getItem('eToken')) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.Dataaa = decodeToken;
      console.log(this.Dataaa);
    }
  }

  //* api for sign up
  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      userData
    );
  }

  //* api for sign in
  login(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      userData
    );
  }

  //* logout
  logout(): void {
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login']);
  }
}
