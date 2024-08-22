import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebService } from '../web.service';
import { CommonModule } from '@angular/common';
import { Book } from '../book';



@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;  // Set book to be of type Book or null

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private webService: WebService
  ) { }

  ngOnInit(): void {
    console.log('Book ID received:', this.data.id); // Log the ID for debugging
    this.webService.getBookById(this.data.id).subscribe(
      (book: Book) => {
        this.book = book;
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  addToCart(item: any) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Item added to cart:', item);
  }

}
