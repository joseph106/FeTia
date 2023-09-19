import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Producto} from "./models/producto";
@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  private productUrl = 'http://localhost:8085/api/product';

  private credit_ProductUrl = 'http://localhost:8085/api/product_credit';

  constructor(private http: HttpClient) {}

  getProducts(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get(`${this.productUrl}`, { params });
  }

  getCreditProduct(page:number, pageSize:number, sku: string): Observable<any>{
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.http.get(`${this.credit_ProductUrl}/${sku}`, { params });
  }
}
