import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/shared/services/brands.service';

interface brands {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandsService) {}

  //* varialbes
  brands: brands[] = [];
  details: brands = {} as brands;
  
  ngOnInit(): void {
    this._BrandsService.getBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
        this.details.name='';
        this.details.slug='';
        this.details.image='';
      },
    });
  }

  showDetails(id: string) {
    this._BrandsService.getspecBrands(id).subscribe({
      next: (response) => {
        this.details = response.data;
        console.log(this.details);
      },
    });
  }
}
