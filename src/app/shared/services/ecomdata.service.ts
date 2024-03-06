import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EcomdataService {
  //*
  constructor(private _HttpClient: HttpClient) {}

  //*### get all product

  getAllProduct(): Observable<any> {
    return this._HttpClient.get(
      ` https://ecommerce.routemisr.com/api/v1/products`
    );
  }

  //* ### get product details
  getProductDetails(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  //* ### get home cateegories
  getcat(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
  }

  //*### get all product

  getAllProductss(num: number = 1): Observable<any> {
    return this._HttpClient.get(
      ` https://ecommerce.routemisr.com/api/v1/products?page=${num}&limit=12`
    );
  }

  //* ### get home cateegories spec
  getcatspec(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`
    );
  }
}
