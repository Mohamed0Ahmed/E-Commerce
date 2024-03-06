import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}

  //*## wishlist number
  wishNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  wishlistData: string[] = [];


  //*### add to wishlist

  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: id }
    );
  }

  //*### add to wishlist

  getWishlist(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`
    );
  }
  //*### Remove

  removeWishlist(id:string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
    );
  }
}
