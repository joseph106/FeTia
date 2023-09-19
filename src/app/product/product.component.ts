import {Component, OnInit} from '@angular/core';
import {ProductserviceService} from "../productservice.service";
import {Producto} from "../models/producto";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  items: Producto[] = [];
  page = 1;
  size = 10;
  totalPages: number | undefined;
  totalElement: number | undefined;

  constructor(private apiService: ProductserviceService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.apiService.getProducts(this.page, this.size)
      .subscribe((data: any) => {
        this.totalElement = data.totalElements;
        this.totalPages = data.totalPages;
        this.items = data.content;
      });
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadItems();
  }

}
