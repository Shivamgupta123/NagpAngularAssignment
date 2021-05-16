import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './invoice/invoice.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
 import {TranslateHttpLoader} from '@ngx-translate/http-loader'

 export function HttpLoaderFactory(httpClient){
  return new TranslateHttpLoader(httpClient)
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductGridComponent,
    ProductDetailComponent,
    CartComponent,
    OrderComponent,
    InvoiceComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
	  ToastrModule.forRoot(),
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader:{provide:TranslateLoader,useFactory:HttpLoaderFactory ,deps:[HttpClient]}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
