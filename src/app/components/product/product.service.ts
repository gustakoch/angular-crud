import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3000/products'

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  showMessage(message: string): void {
    this.snackBar.open(message, '✖', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: 'snack-bar'
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`

    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`

    return this.http.put<Product>(url, product)
  }
}
