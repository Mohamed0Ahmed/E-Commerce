import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
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
  Dataaa: any;
  userName: string = '';
  userEmail: any;

  //*

  ngOnInit(): void {
    //* get id
    if (localStorage.getItem('eToken')) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.Dataaa = decodeToken;
      this.userName = this.Dataaa.name;
      this.userEmail = localStorage.getItem('mail');

      console.log(this.Dataaa.id);
    }

    //* ### get pic

    if (localStorage.getItem(this.Dataaa.id)) {
      this.photo = localStorage.getItem(this.Dataaa.id)!;
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
          localStorage.setItem(this.Dataaa.id, this.photo);
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
    localStorage.removeItem(this.Dataaa.id);
    this.photo = './assets/images/OIP.jpeg';
  }
}
