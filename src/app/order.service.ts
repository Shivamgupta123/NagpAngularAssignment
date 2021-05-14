import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http : HttpClient) { }

  addOrder(order : any){
   return this._http.post('http://localhost:3000/orders', order);
  }
  getOrders(){
    return this._http.get('http://localhost:3000/orders');
  }
  deleteOrder(orderId : number){
    return this._http.delete('http://localhost:3000/orders/'+orderId);
  }
}
