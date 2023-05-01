import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'https://fakestoreapi.com/';

  getProductList() {
    return this.httpClient.get(this.baseUrl + 'products');
  }

  getProductDetails(id: number) {
    return this.httpClient.get(this.baseUrl + 'products/' + id);
  }
}
