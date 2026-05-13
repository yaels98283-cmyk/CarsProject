import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Payment {
    code: number;
    creditCard: string; 
    validity: string;
    cvc: number;
}
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  url: string = "http://localhost:53191/api/payment";

  constructor(private http: HttpClient) { }

  insertPayment(payment: Payment): Observable<string> {
    return this.http.post(`${this.url}/insertpayment`, payment, { responseType: 'text' });
  }
}
