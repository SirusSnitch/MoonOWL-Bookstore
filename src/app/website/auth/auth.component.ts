import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    public dialog: MatDialog
  ) { }

  openSignUp(): void {
    this.dialogRef.close(); // Close the current dialog
    this.dialog.open(SignupComponent, {
      width: '90%',
      data: { /* Pass data if needed */ }
    });
  }

}
