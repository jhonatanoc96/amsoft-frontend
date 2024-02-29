import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  private apiUrl = `${environment.apiUrl}/product-types`;

  constructor(private http: HttpClient) { }

  getProductTypes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createProductType(productType: any): Observable<any> {
    return this.http.post(this.apiUrl, productType);
  }

  updateProductType(id: number, productType: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productType);
  }

  deleteProductType(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}