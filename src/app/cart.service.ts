import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.BASE_URL;
  constructor(private _http : HttpClient) { }

  addToCart(product : any){
    return this._http.post(this.baseUrl+"/cart", product);
  }

  getAllProductsFromCart(){
    return this._http.get(this.baseUrl+"/cart");
  }
  
  getProductByIdFromCart(id : number){
    return this._http.get(this.baseUrl+"/cart/"+id);
  }

  deleteProductFromCart(productId : number){
    return this._http.delete(this.baseUrl+"/cart/"+productId);
  }

  updateProductQuantityIncart(id : number,product : any){
    return this._http.put(this.baseUrl+"/cart/"+id, product);
  }
}
