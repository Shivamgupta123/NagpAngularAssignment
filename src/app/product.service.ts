import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   baseUrl = environment.BASE_URL;
  // baseUrl = 'http://localhost:3000'
  constructor(private _http : HttpClient) { }

  getProducts(){
    return this._http.get(this.baseUrl+"/products");
  }

  getProductById(productId : number){
    return this._http.get(this.baseUrl+"/products/"+productId);
  }

  getProductCategories(){
    return this._http.get(this.baseUrl+"/categories")
  }
  getProductsByCategories(category : string){
    return this._http.get(this.baseUrl+"/products?category="+category)
  }
}
