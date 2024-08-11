import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    public dialog: MatDialog
  ) { }

  openLogin(): void {
    this.dialogRef.close(); // Close the current dialog
    this.dialog.open(AuthComponent, {
      width: '90%',
      data: { /* Pass data if needed */ }
    });
  }


}
