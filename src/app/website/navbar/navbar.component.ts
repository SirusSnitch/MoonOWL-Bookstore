import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '90%',
      data: { /* You can pass data to the dialog here if needed */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result here if necessary
    });
    
  }


}
