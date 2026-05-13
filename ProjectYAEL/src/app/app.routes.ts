import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login'; 
import { DisplayCars } from './components/display-cars/display-cars';
import { Payment } from './components/payment/payment';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path:'display-cars',component: DisplayCars},
  {path:'payment/:id',component:Payment}
];
