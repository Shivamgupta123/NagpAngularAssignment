import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { OrderComponent } from '../order/order.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  products : any
  user : any
  order : any;
  total_price : number
  constructor(private cartService : CartService, private userService : UserService, private orderService : OrderService) { }

  
  ngOnInit(): void {
    this.userService.current_user.subscribe(response =>{
      this.user = response
    })
    this.orderService.getOrders().subscribe((res : any[]) =>{
     
      this.order = res[0];
      console.log(res);
      this.products = this.order.products;
    })
    // this.cartService.getAllProductsFromCart().subscribe((res : any[]) =>{
    //   // this.products = res;
    //    // console.log('inside getAllProductsFromCart');
    //    // console.log('current_user', this.current_user);
    //    this.products = res.filter(x => x.userId == this.user.id);
    //    this.total_price = this.calculateTotalPrice(this.products);
    //  })
  }
  // calculateTotalPrice(products : any){
  //   var total = 0;
  //   products.forEach(product  => {
  //     total += product.price
  //   });
  //   return total;
  // }

}
