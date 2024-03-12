import { Component } from '@angular/core';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

//* #########

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

//* #########
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  //! #### variables ####
  errorMessage: string = '';
  isValid: boolean = false;
  //*  == > object for backend

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w{6,12}$/),
      ]),
      rePassword: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.confirmPass] } as FormControlOptions
  );

  //* ##### confirmPassword ######
  confirmPass(group: FormGroup): void {
    const pass = group.get('password');
    const rePass = group.get('rePassword');
    if (rePass?.value == '') {
      rePass?.setErrors({ required: true });
    } else if (pass?.value != rePass?.value) {
      rePass?.setErrors({ missMatch: true });
    }
  }

  handleForm(): void {
    //* ### object to backend

    const userData = this.registerForm.value;
    this.isValid = true;
    if (this.registerForm.valid) {
      this._AuthService.register(userData).subscribe({
        next: (response) => {
          this._Router.navigate(['/login']);
          this.isValid = false;
          
        },

        error: (err) => {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
          console.log(err);
          this.isValid = false;
        },
      });
    }
  }
}
