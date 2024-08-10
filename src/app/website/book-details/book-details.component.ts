import { Component } from '@angular/core';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  showPopup: boolean = false;

  open() {
    this.showPopup = true;
  }

  close() {
    this.showPopup = false;
  }
}
