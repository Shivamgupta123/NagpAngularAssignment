import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http : HttpClient) { }

  addToCart(product : any){
    return this._http.post("http://localhost:3000/cart", product);
  }

  getAllProductsFromCart(){
    return this._http.get("http://localhost:3000/cart");
  }
  
  getProductByIdFromCart(id : number){
    return this._http.get("http://localhost:3000/cart/"+id);
  }

  deleteProductFromCart(productId : number){
    return this._http.delete("http://localhost:3000/cart/"+productId);
  }

  updateProductQuantityIncart(id : number,product : any){
    return this._http.put("http://localhost:3000/cart/"+id, product);
  }
}
