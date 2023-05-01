import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
Router
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  queryParams: any;
  product_details: any;
  cartItems: any[] = [];

  constructor(private activeRoute: ActivatedRoute, private apiService: ApiService, private router: Router) {
    this.activeRoute.queryParams.subscribe((params: any) => {
      this.queryParams = params;
    });
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }

  async ngOnInit() {
    try {
      await this.apiService.getProductDetails(this.queryParams.id).subscribe((e) => {
        console.log('e: ', e);
        this.product_details = e;
        this.product_details.quantity = 1;
      });
      console.log('this.product_details: ', this.product_details);
    } catch (error: any) {
      console.log('error: ', error);
    }
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.router.navigate(['/cart']);
  }
}
