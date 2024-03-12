import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  //! #### variables ####
  errorMessage: string = '';
  isValid: boolean = false;
  //*  == > object for backend

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,12}$/),
    ]),
  });

  //* ##### method ######

  handleForm(): void {
    //* ### object to backend
    this.errorMessage = '';
    const userData = this.loginForm.value;
    this.isValid = true;
    if (this.loginForm.valid) {
      this._AuthService.login(userData).subscribe({
        next: (response) => {
          localStorage.setItem('eToken', response.token);
          this._AuthService.saveUserData();
          localStorage.setItem('mail', userData.email);
          localStorage.setItem('pass', userData.password);
          this._Router.navigate(['/home']);
          this.isValid = false;
          console.log(userData);
        },

        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
          console.log(err);
          this.isValid = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.isValid = false;
    }
  }
}
