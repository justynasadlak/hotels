import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return next.handle(localStorage.getItem('token') ?
      req.clone({setHeaders: headers}) : req);
  }
}
