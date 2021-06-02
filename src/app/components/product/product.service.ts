import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, '✖', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(object => object),
      catchError(error => this.handleError(error))
    )
  }

  handleError(error: any): Observable<any> {
    this.showMessage(`Erro interno da aplicação! ${error.message}`, true)

    return EMPTY
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  readById(id: string | null): Observable<Product> {
    const url = `${this.baseUrl}/${id}`

    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`

    return this.http.put<Product>(url, product)
  }

  destroy(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`

    return this.http.delete<Product>(url)
  }
}
