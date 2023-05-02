import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';
import { ProductService } from '../utils/product.service';
import { Router } from '@angular/router';
import { OrderService } from '../utils/order.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  username : string;
  tyres: any[] = [];

  constructor(private connectionService: ConnectionService, private router: Router,
    private productService : ProductService, private orderService : OrderService){
    this.username = localStorage['username'];
  }
  addToCart(tyre: any): void {
    this.orderService.addToCart(tyre);
  }

  logout() {
    this.connectionService.logout();
    this.router.navigate(['/login']);
    }


  ngOnInit(): void {
    this.productService.getTyres().subscribe(
      data => {this.tyres = data;}
    );
  }
}
