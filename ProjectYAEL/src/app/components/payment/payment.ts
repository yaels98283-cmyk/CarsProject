import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Rent, RentService } from '../../services/rent.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment implements OnInit {
  selectedCar: any;
  startDate: string = '';
  endDate: string = '';
  totalPrice: number = 0;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private rentService: RentService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.carService.getAllCars().subscribe(allCars => {
        this.selectedCar = allCars.find(c => c.code === +carId);
        this.cdr.detectChanges();
      });
    }
    const userJson = localStorage.getItem('currentUser');
    if (userJson) this.currentUser = JSON.parse(userJson);
  }

  onStartDateChange() {
    if (this.endDate && this.endDate < this.startDate) {
      this.endDate = '';
      this.totalPrice = 0;
    }
    this.calculatePrice();
  }

  calculatePrice() {
    if (this.selectedCar && this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      
      if (end >= start) {
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        this.totalPrice = (diffDays === 0 ? 1 : diffDays) * this.selectedCar.priceForDay;
      } else {
        this.totalPrice = 0;
      }
      this.cdr.detectChanges();
    }
  }

  processPayment() {
    const newRent: Rent = {
      code: 0,
      codeCar: this.selectedCar.code,
      codeCustomer: this.currentUser.Id || this.currentUser.id,
      startDate: new Date(this.startDate),
      endDate: new Date(this.endDate),
      goal: "השכרת רכב",
      Cars: null,
      Customers: null
    };

    this.rentService.insertRent(newRent).subscribe({
      next: (res) => { alert("ההזמנה בוצעה!"); this.router.navigate(['/display-cars']); },
      error: (err) => console.error("שגיאה:", err)
    });
  }
}