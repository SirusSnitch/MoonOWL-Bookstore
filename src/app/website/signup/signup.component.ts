import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WebService } from '../web.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    public dialog: MatDialog,
    private webService: WebService
    /* public webService: WebService */
  ) { }

  openLogin(): void {
    this.dialogRef.close(); // Close the current dialog
    this.dialog.open(AuthComponent, {
      width: '90%',
      data: { /* Pass data if needed */ }
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      const { username, email, password, confirmPassword } = form.value;

      // Check if passwords match
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      const userData = {
        name: username,  // Mapping to 'name' for the backend
        email,
        password
      };

      this.webService.register(userData).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.dialogRef.close(); // Optionally close the signup dialog
        },
        error: (error) => {
          console.error('Error registering user:', error);
        },
        complete: () => {
          console.log('Registration complete');
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
}
