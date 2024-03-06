import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/shared/interfaces/categories';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _EcomdataService: EcomdataService) {}

  categoryData: Categories[] = [];
  catSpec :Categories[]=[];
  flag:boolean =false ;

  //* ### get categories
  ngOnInit(): void {
    this._EcomdataService.getcat().subscribe({
      next: (response) => {
        this.categoryData = response.data;
      },
    });
  }
  //*###
  getCatSpec(id: string) {
    this._EcomdataService.getcatspec(id).subscribe({
      next: (response) => {
        console.log(response);
        this.catSpec = response.data;
        this.flag=true
      },
    });
  }
}
