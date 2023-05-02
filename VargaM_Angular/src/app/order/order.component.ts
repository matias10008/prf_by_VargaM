import { Component, OnInit } from '@angular/core';
import { OrderService } from '../utils/order.service';
import { ConnectionService } from '../utils/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  billingName : string;
  address : string;
  cartItems: any[] = [];

  constructor(private orderService: OrderService, private connectionService: ConnectionService,private router: Router) {
    this.billingName = '';
    this.address = '';
  }

  logout() {
    this.connectionService.logout().subscribe();
    this.router.navigate(['/login']);
    }

  addToCart(item: any): void {
    this.orderService.addToCart(item);
  }
  clearCart(): void {
    this.orderService.clearCart();
    this.cartItems = [];
  }

  confirmOrder(): void {
    this.orderService.submitOrder(this.billingName, this.address, this.cartItems).subscribe();
    this.orderService.clearCart();
    this.cartItems = [];
    this.router.navigate(['/products'])
  }

  ngOnInit(): void {
    this.cartItems = this.orderService.getCartItems();
  }

}
