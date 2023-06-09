import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'services/authservice';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(username, password).subscribe(
      (response: any) => {
        // Assuming the API returns a JWT token in the response
        const token = response.token;
        if (token) {
          // Save the token in local storage or a secure storage mechanism
          localStorage.setItem('token', token);

          // Redirect to the search page or any other desired route
          this.router.navigate(['/search']);
        } else {
          this.snackBar.open('Invalid credentials.', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      },
      (error: any) => {
        console.log(error);
        this.snackBar.open('An error occurred.', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }}
