import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements HttpInterceptor {

  constructor(private httpClient: HttpClient, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({});
    return next.handle(authReq).pipe(
      catchError(error => {
        if (error.status === 408) {
          console.log('User not authorized');
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }

  baseUrl = 'https://fakestoreapi.com/';

  getProductList() {
    return this.httpClient.get(this.baseUrl + 'products');
  }

  getProductDetails(id: number) {
    return this.httpClient.get(this.baseUrl + 'products/' + id);
  }
}
