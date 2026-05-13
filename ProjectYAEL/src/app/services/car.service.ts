import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Car{
  code: number;
  numSeats: number;
  level: number;
  priceForDay: number;
  priceForThreeDaysAndMore: number;
}
@Injectable({
  providedIn: 'root',
})
export class CarService {

  url:string="http://localhost:53191/api/car";
  constructor(private http: HttpClient) { }
  
  


  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/getallcars`);
  }

  getCarsBySeats(numSeats: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/getcarsbyseats/${numSeats}`);
  }

  getCarsByLevel(level: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/getcarsbylevel/${level}`);
  }

  getCarsByCriteria(level: number, price: number, seats: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/getcarsbyallcriterions/${level}/${price}/${seats}`);
  }
}
