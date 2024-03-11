import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  constructor(
    private _UserService: UserService,
    private _AuthService: AuthService
  ) {}
  //* variables

  photo: string = './assets/images/OIP.jpeg';
  selectedFile: File | null = null;
  message: string = '';

  //*

  ngOnInit(): void {
    //* ### get pic
    if (localStorage.getItem('photo')) {
      this.photo = localStorage.getItem('photo')!;
    } else {
      this.photo = './assets/images/OIP.jpeg';
    }
  }

  logoutUser(): void {
    this._AuthService.logout();
  }

  onUploadClicked(): void {
    this.fileInput.nativeElement.click();
  }
  //* ### Select photo
  onFileSelected(event: any): void {
    this.message = '';
    const file = event.target.files[0];

    if (file) {
      if (file.type.match(/image.*/)) {
        this.selectedFile = file;

        console.log('Selected file:', this.selectedFile);

        const reader = new FileReader();

        reader.onload = (event: any) => {
          this.photo = event.target.result;
          localStorage.setItem('photo', this.photo);
        };

        reader.readAsDataURL(this.selectedFile!);
      }
      //*
      else {
        this.message = 'Please select an image file.';
      }
    }
  }
  //* #### Remove photo
  remove(): void {
    localStorage.removeItem('photo');
    this.photo = './assets/images/OIP.jpeg';
  }
}
