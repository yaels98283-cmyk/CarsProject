import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from './city.service';
import { Payment } from './payment.service';

export interface Customer{

  Id: number;
  firstName: string;
  lastName: string;
  codeCity: number;
  email: string;
  numRents: number;
  codePayment: number;
  address: string;
  City: City| null; 
  Payment:Payment| null;
}
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url: string = "http://localhost:53191/api/customer";

  constructor(private http: HttpClient) { }

  
  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/getcostomerbyid/${customerId}`);
  }
  insertNewCustomer(customer: Customer): Observable<string> {
    return this.http.post(`${this.url}/insertclient`, customer, {
      responseType: 'text'
    })
  }
  getCustomersByCity(cityCode:number):Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.url}/getfromcity/${cityCode}`)
  }
  getThreeV():Observable<Customer[]>
  {
    return this.http.get<Customer[]>(`${this.url}/GetThreeV`);
  }
}
