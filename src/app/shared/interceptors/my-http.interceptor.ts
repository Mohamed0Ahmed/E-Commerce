import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //* 
    if (localStorage.getItem('eToken') !== null) {
      const headers: any = { token: localStorage.getItem('eToken') };

      request = request.clone({
        setHeaders: headers,
      });
    } 
    //*
   

    return next.handle(request);
  }
}
