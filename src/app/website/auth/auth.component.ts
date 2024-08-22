import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { WebService } from '../web.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    public dialog: MatDialog,
    private webService: WebService
  ) { }

  openSignUp(): void {
    this.dialogRef.close(); // Close the current dialog
    this.dialog.open(SignupComponent, {
      width: '90%',
      data: { /* Pass data if needed */ }
    });
  }

  onLoginSubmit(form: any) {
    if (form.valid) {
      const { email, password } = form.value;
  
      this.webService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
  
          // Store the JWT token and user details in localStorage
          localStorage.setItem('token', response.mytoken);
  
          // Decode the payload (e.g., using jwt-decode package or manually)
          const decodedPayload = this.decodeToken(response.mytoken);

          console.log('Decoded payload:', decodedPayload);
  
          // Store user information in localStorage
          localStorage.setItem('user', JSON.stringify(decodedPayload));
  
          this.dialogRef.close(); // Optionally close the login dialog
        },
        error: (error) => {
          console.error('Error logging in:', error);
        },
        complete: () => {
          console.log('Login request complete');
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
  // Helper function to decode the JWT token
  decodeToken(token: string) {
    const payload = token.split('.')[1]; // Get the payload part of the JWT
    return JSON.parse(atob(payload)); // Decode the base64-encoded payload
  }
  

}
