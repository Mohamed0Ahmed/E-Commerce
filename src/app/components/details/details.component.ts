import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _WishlistService: WishlistService
  ) {}
  //* ##### variables
  productDetails: product = {} as product;
  wishlistData: string[] = [];

  //* details slider
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    items: 1,
    nav: true,
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        let productId: any = param.get('id');
        console.log(productId);

        this._EcomdataService.getProductDetails(productId).subscribe({
          next: (response) => {
            this.productDetails = response.data;
            console.log(this.productDetails);
          },
        });
      },
    });
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

  //* add to wish list
  addOrRemove(id: string) {
    if (this.wishlistData.includes(id)) {
      this._WishlistService.removeWishlist(id).subscribe({
        next: (response) => {
          console.log(response);
          this._toastr.success(response.message);
          this._WishlistService.wishNumber.next(response.data.length);
          this.wishlistData = response.data;
        },
      });
      //*
    } else {
      this._WishlistService.addToWishlist(id).subscribe({
        next: (response) => {
          console.log(response);
          this._toastr.success(response.message);
          this._WishlistService.wishNumber.next(response.data.length);
          this.wishlistData = response.data;
        },
      });
    }
  }
  //* show Stars
  generateRatingArray(ratingAverage: number): any[] {
    return Array.from({ length: ratingAverage }, (star, index) => index);
  }
}
