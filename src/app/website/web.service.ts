import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';  // Assuming you have a Book interface
import { tap } from 'rxjs/operators'; 

interface RegisterData {
  name: string;
  email: string; // Assuming you want email registration
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3000/';


  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url + 'product/getall').pipe(
      tap(
        (data) => {
          console.log('Data received:', data);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      )
    );
  }


  register(userData: RegisterData): Observable<any> {
    return this.http.post<any>(this.url + 'user/register', userData)
      .pipe(
        tap(() => console.log('User registration successful!')) // Optional success logging
      );
  }


  login(credentials: LoginData): Observable<any> {
    return this.http.post<any>(this.url + 'user/login', credentials);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(this.url + 'product/getbyid/'+ id).pipe(
      tap(
        (data) => {
          console.log('Book details received:', data);
        },
        (error) => {
          console.error('Error fetching book details:', error);
        }
      )
    );
  }

  confirmOrder(order: any) {
    return this.http.post(this.url + 'order/add', order);
  }

}

