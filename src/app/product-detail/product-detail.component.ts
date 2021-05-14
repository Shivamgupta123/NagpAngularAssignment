import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: number;
  product: any;
  productsInCart: any;
  productAvailable: any
  isLoggedIn : boolean
  current_user : any
  constructor(private activatedRouter: ActivatedRoute, private productService: ProductService, private cartService: CartService,private userService : UserService, private router : Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productId = +this.activatedRouter.snapshot.paramMap.get('id')
    console.log(this.productId);
    this.productService.getProductById(this.productId).subscribe((res: any) => {
      this.product = res;
      console.log(this.product)
    })
  }
  // ngOnDestroy() : void{
  //  this.userService.current_user.unsubscribe();
  //  this.userService.isLoggedIn.unsubscribe();
  // }
  addProductTocart(product : any){
    console.log('inside addProductTocart, isLoggedIn = ', this.isLoggedIn);
    
    this.cartService.getAllProductsFromCart().subscribe((res) => {
      console.log('res', res);
      this.productsInCart = res;
      this.productAvailable = this.productsInCart.filter(x => x.productId == product.id && x.userId == this.current_user.id)
      console.log('productAvailable', this.productAvailable);
      let cartProduct = {
        "id": 0,
        "userId" : 0,
        "productId": 0,
        "productImage" : '',
        "name": "",
        "product_quantity" : 0,
        "price": 0,
        "category": "",
        "quantityInCart": 0
      };
      if(this.productAvailable.length == 0){
      cartProduct.userId = this.current_user.id;
      cartProduct.name = product.name;
      cartProduct.productId = product.id;
      cartProduct.productImage = product.image;
      cartProduct.product_quantity = product.number;
      cartProduct.price = product.price;
      cartProduct.category = product.category;
      cartProduct.quantityInCart =  1 ;
      this.cartService.addToCart(cartProduct).subscribe((response) => {
        console.log('response', response);
      })
      // window.alert('product added to cart');
      console.log('product added to cart');
      this.toastr.success("product added to cart.")
      console.log(product);
    }
    else{
      var quantity = this.productAvailable[0].quantityInCart + 1;
      cartProduct.name = product.name;
      cartProduct.productId = product.id;
      cartProduct.productImage = product.image;
      cartProduct.product_quantity = product.number
      cartProduct.price = product.price * quantity;
      cartProduct.category = product.category;
      cartProduct.userId = this.current_user.id
      cartProduct.quantityInCart = this.productAvailable[0].quantityInCart + 1;
      console.log(this.productAvailable[0].id)
      this.cartService.updateProductQuantityIncart(this.productAvailable[0].id,cartProduct).subscribe((response) =>{
        console.log(response);
      })
      // window.alert('product already there in cart');
      this.toastr.success("product added to cart.")
      console.log('product already there in cart');
      
      console.log(product);
    }
      
    })
  }
  addToCart(product) {
    this.userService.isLoggedIn.subscribe(res =>{
      this.isLoggedIn = res;
    })
    if(this.isLoggedIn == true){
      this.userService.current_user.subscribe(response =>{
        this.current_user = response
        
      })
      this.addProductTocart(product)
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
