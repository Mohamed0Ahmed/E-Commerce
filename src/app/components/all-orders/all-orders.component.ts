import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserOrders } from 'src/app/shared/interfaces/user-orders';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
})
export class AllOrdersComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  //* variables
  Dataa: any;
  userOrders: UserOrders[] = [];
  ngOnInit(): void {
    if (localStorage.getItem('eToken')) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.Dataa = decodeToken;
    }

    this._CartService.getUserOrders(this.Dataa.id).subscribe({
      next: (response) => {
        console.log(response);
        this.userOrders = response;
      },
    });
  }
}
