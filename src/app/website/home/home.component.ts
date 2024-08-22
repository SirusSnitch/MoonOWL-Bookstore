import { Component, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { MatDialog } from '@angular/material/dialog';
import { WebService } from '../web.service';
import { Book } from '../book';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('stars', { static: false }) stars!: ElementRef;

  books: Book[] = [];

  constructor( private dialog: MatDialog, private webService: WebService) {  }

  ngAfterViewInit() {
    // Now you can access the element using this.stars.nativeElement
    this.applyParallaxEffect();

    this.webService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
   
 
  }

  

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.applyParallaxEffect();
  }

  applyParallaxEffect() {
    const scrollPosition = window.pageYOffset;
    this.stars.nativeElement.style.transform = `translateX(${scrollPosition * -0.7}px)`;
  }



  

  openDialog(bookId: string): void {
    const dialogRef = this.dialog.open(BookDetailsComponent, {
      width: '90%',
      data: { id: bookId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result here if necessary
    });
    
  }
}