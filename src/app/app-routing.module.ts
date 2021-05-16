import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
   {path : '', component : ProductGridComponent},
  {path : 'grid', component : ProductGridComponent},
  {path : 'cart', component : CartComponent, canActivate : [AuthGuard]},
  {path : 'product/:id', component : ProductDetailComponent},
  {path : 'order', component : OrderComponent, canActivate : [AuthGuard]},
  {path : 'login', component : LoginComponent},
  {path : 'invoice', component : InvoiceComponent},
  {path : 'register', component : RegisterComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
