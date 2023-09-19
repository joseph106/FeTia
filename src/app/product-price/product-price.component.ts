import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductserviceService} from "../productservice.service";
import {CreditProducto} from "../models/credit-producto";

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.css']
})
export class ProductPriceComponent {
  formulario: FormGroup;
  items: CreditProducto[] = [];
  page = 1;
  size = 10;
  totalPages: number | undefined;
  totalElement: number | undefined;
  sku_find: string = "";
  sku_found:boolean = false;
  sku_not_found:boolean = false;

  sku_cp: string |undefined;
  price_cp: number |undefined;
  increment_cp: number |undefined;
  dues_cp: number |undefined;

  constructor(private fb: FormBuilder, private apiService: ProductserviceService) {
    this.formulario = this.fb.group({
      sku: ['', Validators.required],
    });
  }

  onSubmit() {
    this.sku_find = this.formulario.get('sku')?.value;

    if (this.sku_find != "") {
      this.loadItems(this.sku_find);
    }else {
      alert("Por favor ingrese el SKU a buscar");
    }
  }

  loadItems(sku: string):void{
    this.apiService.getCreditProduct(this.page, this.size, sku)
      .subscribe((data: any) => {

        if(data.length == 1){
          this.sku_cp = data[0].producto.sku;
          this.price_cp = data[0].producto.price;
          this.increment_cp = data[0].producto.increment;
          this.dues_cp = data[0].maxDuesNo;
          console.log(data[0]);
          this.sku_not_found = false;
          this.sku_found = true;
        } else {
          this.totalElement = data.totalElements;
          this.totalPages = data.totalPages;
          this.items = data.content;
          this.sku_not_found = true;
          this.sku_found = false;
        }

      });
  }
  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadItems(this.sku_find);
  }


}
