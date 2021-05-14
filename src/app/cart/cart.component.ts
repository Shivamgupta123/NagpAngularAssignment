import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { ConfirmDialogService } from '../confirm-dialog.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products : any
  total_price : number
  current_user : any
  constructor(private cartService : CartService, private userService : UserService, private confirmDialogService : ConfirmDialogService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.current_user.subscribe(response =>{
      this.current_user = response
    })
    this.cartService.getAllProductsFromCart().subscribe((res : any[]) =>{
     // this.products = res;
      // console.log('inside getAllProductsFromCart');
      // console.log('current_user', this.current_user);
      this.products = res.filter(x => x.userId == this.current_user.id);
      this.total_price = this.calculateTotalPrice(this.products);
    })
  }
  removeProductFromCart(product : any){
    let that = this;
    this.confirmDialogService.confirmThis("Are you sure you want to delete this item?", function () {  
      //alert("Yes clicked");
      console.log(product.id);
      that.cartService.deleteProductFromCart(product.id).subscribe((res) =>{
        console.log(res);
        that.cartService.getAllProductsFromCart().subscribe((response : any[]) =>{
          that.products = response.filter(x => x.userId == that.current_user.id);
          that.total_price = that.calculateTotalPrice(that.products);
          
        })
        that.toastr.success("product deleted from cart.")
      })  
    }, function () {  
      alert("No clicked");  
    })
   
  
  }
  calculateTotalPrice(products : any){
    var total = 0;
    products.forEach(product  => {
      total += product.price
    });
    return total;
  }
  increaseProductQuantityInCart(product){
    let cartProduct = {
      "id": 0,
      "productId": 0,
      "userId" : 0,
      "productImage" : "",
      "name": "",
      "price": 0,
      "product_quantity" : 0,
      "category": "",
      "quantityInCart": 0
    };
    var quantity = product.quantityInCart + 1;
    cartProduct.name = product.name;
    cartProduct.productId = product.productId;
    cartProduct.userId = product.userId;
    cartProduct.productImage = product.productImage;
    cartProduct.product_quantity = product.product_quantity;
    cartProduct.price = product.price + (product.price/product.quantityInCart);
    cartProduct.category = product.category;
    cartProduct.quantityInCart = quantity;
    this.cartService.updateProductQuantityIncart(product.id,cartProduct).subscribe((response) =>{
      console.log(response);
     // this.products = response;
     this.cartService.getAllProductsFromCart().subscribe((res : any[]) =>{
      this.products = res.filter(x => x.userId == this.current_user.id);
      this.total_price = this.calculateTotalPrice(this.products);
    })
    })
   
  }

  decreaseProductQuantityInCart(product : any){
    let cartProduct = {
      "id": 0,
      "productId": 0,
      "userId" : 0,
      "productImage" : "",
      "name": "",
      "price": 0,
      "product_quantity" : 0,
      "category": "",
      "quantityInCart": 0
    };
    var quantity = product.quantityInCart - 1;
    cartProduct.name = product.name;
    cartProduct.productId = product.productId;
    cartProduct.userId = product.userId;
    cartProduct.productImage = product.productImage;
    cartProduct.product_quantity = product.product_quantity
    cartProduct.price = product.price - (product.price/product.quantityInCart);
    cartProduct.category = product.category;
    cartProduct.quantityInCart = quantity;
    this.cartService.updateProductQuantityIncart(product.id,cartProduct).subscribe((response) =>{
      console.log(response);
     // this.products = response;
     this.cartService.getAllProductsFromCart().subscribe((res : any[]) =>{
      this.products = res.filter(x => x.userId == this.current_user.id);
      this.total_price = this.calculateTotalPrice(this.products);
    })
    })
    
  }

}
