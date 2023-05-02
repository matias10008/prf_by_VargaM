import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addToCart(item: any): void {
    let cartItems = this.getCartItems();
    cartItems.push(item);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
  getCartItems(): any[] {
    const storedItems = localStorage.getItem('cart');
    return storedItems ? JSON.parse(storedItems) : [];
  }
  clearCart(): void {
    localStorage.removeItem('cart');
  }

  submitOrder(billingName: string, address: string, cartItems: any[]): Observable<any> {
    const orderData = {
      billingName,
      address,
      cartItems
    };

    return this.http.post<any>('http://localhost:3000'+'/submitOrder', orderData);
  }


}
