import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IProduct } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  products : any  = []
  filterInputPlaceholder : string = "Search by name";
  _filterText : string = "";
  totalRecords : number
  page : number = 1
  categories : any
  
  public get filterText() : string {
    return this._filterText
  }
  public set filterText(value : string) {
    this._filterText = value;
    this.filteredProducts = this.filterText ? this.updateFilter(this.filterText) : this.products
    this.totalRecords = this.filteredProducts.length;
  }
  filteredProducts : any;
  
  
  constructor(private productService : ProductService, private translate : TranslateService) {
  }

  ngOnInit(): void {
    this.getAllProducts()
    this.productService.getProductCategories().subscribe((res)=>{
      this.categories = res
    })
  }
  getAllProducts(){
    this.productService.getProducts().subscribe((response) =>{
      console.log(response);
      this.products = response;
      console.log('products', this.products);
      this.filteredProducts = this.products
    })
  }
  updateFilter(filterBy : string) : any{
    filterBy = filterBy.toLowerCase();
    return this.products.filter(product => product.name.toLowerCase().indexOf(filterBy) !== -1);
  }
  onClickProductName(id : number){
    console.log(id);
  }
  filter(elem, category){
    if(elem.target.checked){
      this.productService.getProductsByCategories(category.name).subscribe((res) =>{
        this.filteredProducts = res;
      })
    }
  }
}
