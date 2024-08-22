import { Routes } from '@angular/router';
import { AuthComponent } from './website/auth/auth.component';
import { BookDetailsComponent } from './website/book-details/book-details.component';
import { CartComponent } from './website/cart/cart.component';
import { HomeComponent } from './website/home/home.component';

export const routes: Routes = [
    {path: '' , component: HomeComponent},
    {path: 'cart' , component: CartComponent},
];
