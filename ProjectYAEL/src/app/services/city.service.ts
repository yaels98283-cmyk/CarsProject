import { Injectable } from '@angular/core';


export interface City {
  code: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CityService {}
