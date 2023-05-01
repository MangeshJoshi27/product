import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];

  constructor() {
    // Load cart items from localStorage
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }
  increment(item: any) {
    item.quantity++;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  remove(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  getTotal() {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2);
  }

}
