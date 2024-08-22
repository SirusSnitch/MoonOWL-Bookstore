import { NgModule } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    MatDialogModule,
    NgForOf
    
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  
})
export class WebsiteModule { }
