import { Component, OnInit } from '@angular/core';
import { Car, CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Rent, RentService } from '../../services/rent.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-display-cars',
  imports: [CommonModule,FormsModule],
  templateUrl: './display-cars.html',
  styleUrl: './display-cars.css',
})
export class DisplayCars implements OnInit{
  allCars:Car[]=[];
  filteredCars:Car[]=[];
  customerHistory:Rent[]=[];
  currentUser:any;

  selectedLevel: number | null = null;
  selectedSeats: number | null = null;

  constructor(private carService: CarService
    ,private rentService:RentService,
    private cdr:ChangeDetectorRef,
    private router:Router) {}
    ngOnInit(){

      
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
      this.currentUser = JSON.parse(userJson);
      this.loadCustomerHistory();
    }
      this.carService.getAllCars().subscribe(data=>
      {
        this.allCars=data;
        this.filteredCars=data;
        this.cdr.detectChanges();
      });
    }
    applyFilters(){
      this.filteredCars=this.allCars.filter(car=>{
        const matchLevel = this.selectedLevel ? car.level == this.selectedLevel : true;
        const matchSeats = this.selectedSeats ? car.numSeats == this.selectedSeats : true;
        return matchLevel && matchSeats;
      });
    }
    loadCustomerHistory() {

    this.rentService.getRentsByCustomerId(this.currentUser.Id).subscribe({
      next: (data) => {
        this.customerHistory = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("שגיאה בטעינת היסטוריה", err)
    });
  }

    resetFilters() {
    this.selectedLevel = null;
    this.selectedSeats = null;
    this.filteredCars = this.allCars;
    console.log("הסינון נמחק");
  }

  onSelectCar(car: any) {
    console.log("נבחר הרכב:", car);
    alert("בחרת ברכב מספר: " + car.code);
    this.router.navigate(['/payment', car.code]);  
  }
}
