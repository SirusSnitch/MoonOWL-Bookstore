import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: any[] = [];
  totalPrice: number = 0;
  userId: string = '';

  constructor(private webService: WebService) {}

  ngOnInit(): void {
    this.cartItems = this.getCartItems();
    this.userId = this.getUserId();
    this.calculateTotal();
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Retrieved user object:', user); 
    return user.id || '';  // Adjust this according to your JWT payload structure
  }

  updateQuantity(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = parseInt(inputElement.value, 10);
  
    if (newQuantity > 0) {
      this.cartItems[index].quantity = newQuantity;
      this.saveCartItems();
      this.calculateTotal();
    }
  }
  

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCartItems();
    this.calculateTotal();
  }

  saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  confirmOrder() {
    const order = { items: this.cartItems, totalPrice: this.totalPrice, userId: this.userId };
    this.webService.confirmOrder(order).subscribe(
      (response) => {
        console.log('Order confirmed:', response);
        localStorage.removeItem('cartItems');
        this.cartItems = [];
        this.totalPrice = 0;
        this.userId = '';
      },
      (error) => console.error('Error confirming order:', error)
    );
  }
}
