import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  product_list: any;
  searchText: any;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getProductList();
  }

  async getProductList() {
    try {
      await this.apiService.getProductList().subscribe((e) => {
        console.log('e: ', e);
        this.product_list = e;
      });
      console.log('this.product_list: ', this.product_list);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  goToDetails(id: number) {
    this.router.navigate(['/product-details'], { queryParams: { id: id } });
  }
}
