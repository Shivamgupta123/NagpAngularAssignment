import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http : HttpClient) { }

  getProducts(){
    return this._http.get("http://localhost:3000/products");
  }

  getProductById(productId : number){
    return this._http.get("http://localhost:3000/products/"+productId);
  }

  getProductCategories(){
    return this._http.get("http://localhost:3000/categories")
  }
  getProductsByCategories(category : string){
    return this._http.get("http://localhost:3000/products?category="+category)
  }
}
