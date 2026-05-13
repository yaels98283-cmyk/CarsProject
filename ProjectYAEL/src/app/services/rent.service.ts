import { Injectable } from '@angular/core';
import { Car } from './car.service';
import { Customer } from './customer.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rent {
    code: number;
    codeCustomer: number;
    codeCar: number;
    startDate: Date;
    endDate: Date;
    goal: string;
    Cars:Car |null; 
    Customers:Customer| null;
}

@Injectable({
  providedIn: 'root',
})
export class RentService {
    url: string = "http://localhost:53191/api/rent";

  constructor(private http: HttpClient) { }
  insertRent(rent:Rent):Observable<string>{
    return this.http.post(`${this.url}/insertrent/rent`, rent,{responseType:'text'})
  }
  getAvailableCars(start: string, end: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/getrentthatavailablefromtoo/${start}/${end}`);
  }
  getRentsByCustomerId(id: number): Observable<Rent[]> {
    return this.http.get<Rent[]>(`${this.url}/getrentbycustomerid/${id}`);
  }
}