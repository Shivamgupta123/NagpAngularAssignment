import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  total_price: number
  cartProducts: any;
  orderDetails: any = {
    ref_number : 0,
    name: '',
    email: '',
    phone: 0,
    address: '',
    country: '',
    state: '',
    city: '',
    zip: 0,
    orderBy: '',
    order_date: '',
    date_delivery: '',
    products: [],
    total_price: 0,
    userId: 0
  }
  isLoggedIn: boolean
  current_user: any
  orderForm: FormGroup
  firstNameControl: FormControl;
  lastnameControl: FormControl
  emailControl: FormControl;
  phoneControl: FormControl;
  addressControl: FormControl
  contryControl: FormControl
  stateControl: FormControl
  cityControl: FormControl
  zipControl: FormControl
  checkBoxControl: FormControl
  button_disabled: boolean = true
  form_disabled: boolean = true
  constructor(private orderService: OrderService, private userService: UserService, private router: Router, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form_disabled = true
    this.button_disabled = true
    this.userService.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res;
    })
    if (this.isLoggedIn == true) {
      this.userService.current_user.subscribe(res => {
        this.current_user = res
      })
    }
    this.orderService.getOrders().subscribe((res : any[]) =>{
     let completed_orders =  res.filter(x => (new Date(x.date_delivery).getDate() == new Date().getDate() && x.userId == this.current_user.id) || (new Date(x.date_delivery).getDate() < new Date().getDate() && x.userId == this.current_user.id))
     completed_orders.forEach((order) =>{
       this.orderService.deleteOrder(order.id).subscribe((response) =>{

       })
     })
    })
    console.log(this.current_user);
    this.firstNameControl = new FormControl({ disabled: true }, [Validators.required]);
    this.lastnameControl = new FormControl({ disabled: true }, [Validators.required]);
    this.emailControl = new FormControl({ disabled: true }, [Validators.required]);
    this.phoneControl = new FormControl({ disabled: true }, [Validators.required]);
    this.addressControl = new FormControl({ disabled: true }, [Validators.required]);
    this.contryControl = new FormControl({ disabled: true }, [Validators.required]);
    this.stateControl = new FormControl({ disabled: true }, [Validators.required]);
    this.cityControl = new FormControl({ disabled: true }, [Validators.required]);
    this.zipControl = new FormControl({ disabled: true }, [Validators.required]);
    this.checkBoxControl = new FormControl('', [Validators.required]);
    this.orderForm = new FormGroup({
      firstName: this.firstNameControl,
      lastName: this.lastnameControl,
      email: this.emailControl,
      phone: this.phoneControl,
      address: this.addressControl,
      country: this.contryControl,
      state: this.stateControl,
      city: this.cityControl,
      zip: this.zipControl,
      check: this.checkBoxControl
    })
    this.orderForm.setValue({
      firstName: this.current_user.first_name,
      lastName: this.current_user.last_name,
      email: this.current_user.email,
      phone: this.current_user.phone,
      address: this.current_user.address,
      country: this.current_user.country,
      state: this.current_user.state,
      city: this.current_user.city,
      zip: this.current_user.zip,
      check: false
    })
    // this.orderForm.disable();
    for (var control in this.orderForm.controls) {
      this.orderForm.controls[control].disable();
    }
  }
   randomStr(len, arr) {
    var ans = '';
    for (var i = len; i > 0; i--) {
        ans += 
          arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}
  OnFormSubmit() {
    console.log(this.orderForm)
    this.createOrder(this.orderForm.value)

  }

  check(elem) {
    if (elem.target.checked) {
      this.button_disabled = false
    }
    else {
      this.button_disabled = true
    }
  }
  formatDate(date: Date): string {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var date1 = new Date(date);
    return months[date1.getMonth()] + ' ' + date1.getDate() + ', ' + date1.getFullYear();
  }
  createOrder(order: any) {
    console.log(order)
    this.userService.current_user.subscribe(response => {
      this.current_user = response
    })
    this.cartService.getAllProductsFromCart().subscribe((res: any[]) => {
      let date = new Date()
      let date_delivery = new Date();
      date_delivery.setDate(date.getDate() + 2);

      this.cartProducts = res.filter(x => x.userId == this.current_user.id);
      this.total_price = this.calculateTotalPrice(this.cartProducts);
      this.orderDetails.ref_number = this.randomStr(6, '12345abcde');
      this.orderDetails.name = order.firstName + ' ' + order.lastName;
      this.orderDetails.email = order.email;
      this.orderDetails.phone = order.phone;
      this.orderDetails.address = order.address;
      this.orderDetails.country = order.country;
      this.orderDetails.state = order.state;
      this.orderDetails.city = order.city;
      this.orderDetails.zip = order.zip;
      this.orderDetails.userId = this.current_user.id
      this.orderDetails.orderBy = this.current_user.first_name + ' ' + this.current_user.last_name;
      this.cartProducts.forEach(product => {
        let obj = {}
        obj['name'] = product.name;
        obj['price'] = product.price
        obj['image'] = product.productImage;
        obj['quantity'] = product.quantityInCart;
        this.orderDetails.products.push(obj);
      });
      this.orderDetails.total_price = this.total_price;
      this.orderDetails.order_date = date;
      this.orderDetails.date_delivery = this.formatDate(date_delivery);
      console.log(this.orderDetails);
      this.orderService.addOrder(this.orderDetails).subscribe((res) => {
        console.log('response of post', res);
        // window.alert('Order placed successfully !');
        this.cartProducts.forEach(product => {
          this.cartService.deleteProductFromCart(product.id).subscribe((response) => {
            console.log(response);
          });
        });
        this.toastr.success("Order placed successfully")
        this.router.navigate(['/invoice']);
      })
    })

  }
  calculateTotalPrice(products: any) {
    var total = 0;
    products.forEach(product => {
      total += product.price
    });
    return total;
  }
  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }
  enableForm() {
    for (var control in this.orderForm.controls) {
      this.orderForm.controls[control].enable();
    }
  }

}
