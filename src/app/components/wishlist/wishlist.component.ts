import { product } from 'src/app/shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _toastr: ToastrService,
    private _CartService: CartService
  ) {}

  //* ## variables

  productData: product[] = [];
  numberOfItems: number = 0;
  //*### get wish list array
  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        console.log(response);
        this.productData = response.data;
        this.numberOfItems = response.count;
      },
    });
  }
  //* remove from wish list
  remove(id: string) {
    this._WishlistService.removeWishlist(id).subscribe({
      next: (response) => {
        console.log(response);
        this._toastr.success(response.message);
        this._WishlistService.wishNumber.next(response.data.length);

        //* Remove the item from productData array
        this.productData = this.productData.filter(
          (product) => product._id !== id
        );

        //* Update the number of items
        this.numberOfItems = this.productData.length;
      },
    });
  }
  //* show Stars
  generateRatingArray(ratingAverage: number): any[] {
    return Array.from({ length: ratingAverage }, (star, index) => index);
  }

  //* ### add to cart
  addCart(id: String): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.numOfCartItems);
        this._toastr.success(response.message);
        this._CartService.cartNubmer.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
