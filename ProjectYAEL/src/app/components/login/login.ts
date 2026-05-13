import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {CustomerService,Customer}from '../../services/customer.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  searchId: number | null = null; 
  isNewUser: boolean = false;    

  
  customer: Customer = {
    Id: 0,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    numRents: 0,
    codeCity: 1,
    codePayment: 1,
    City:null,
    Payment:null
  };

  constructor(private customerService: CustomerService, private router: Router) {}

  
  checkIfExist() {
    if (!this.searchId) {
      alert("נא להזין תעודת זהות תקינה");
      return;
    }

    this.customerService.getCustomerById(this.searchId).subscribe({
      next: (data) => {
        if (data) {
          
          alert(`שלום ${data.firstName}, התחברת בהצלחה!`);
          this.saveAndNavigate(data);
        } else {
         
          this.prepareRegister();
        }
      },
      error: (err) => {
        this.prepareRegister();
      }
    });
  }

  prepareRegister() {
    this.isNewUser = true;
    this.customer.Id = this.searchId!; 
  }

  
  onSubmitRegister() {
    this.customerService.insertNewCustomer(this.customer).subscribe({
      next: (res:string) => {
        alert("נרשמת בהצלחה במערכת!");
        this.saveAndNavigate(this.customer);
      },
      error: (err:any) => alert("שגיאה ברישום הלקוח")
    });
  }
  saveAndNavigate(user: Customer) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['/display-cars']);
  }
}
