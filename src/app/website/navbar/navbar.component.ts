import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {


  userName: string | null = null;
  dropdownVisible = false;

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;  // Get the user's name from localStorage
    }
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;  // Toggle the visibility of the dropdown
  }

  logout(): void {
    // Clear the token and user details on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userName = null;  // Reset the userName
    this.dropdownVisible = false;  // Close the dropdown
  }
  

  handleUserAction(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    
    if (selectedValue === 'admin') {
        window.location.href = 'http://localhost:3000/admin'; // Redirect to the admin page
    } else if (selectedValue === 'logout') {
        this.logout(); // Call your logout method
    }
  }



  

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
