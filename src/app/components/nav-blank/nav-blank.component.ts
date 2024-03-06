import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  //* variables

  navCartNum: number = 0;
  wishlistNum: number = 0;

  logoutUser(): void {
    this._AuthService.logout();
  }

  ngOnInit(): void {
    this._CartService.cartNubmer.subscribe({
      next: (num) => {
        this.navCartNum = num;
      },
    });

    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.navCartNum = response.numOfCartItems;
      },
    });
    //*####
    this._WishlistService.wishNumber.subscribe({
      next: (num) => {
        this.wishlistNum = num;
      },
    });
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        console.log(response);
        this.wishlistNum = response.count
      },
    });
  }
}
