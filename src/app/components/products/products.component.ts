import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  //* variables
  productData: product[] = [];
  serchTerm: string = '';
  pageSize: number = 0; //* limit
  currentPage: number = 1; //* current
  total: number = 0;
  wishlistData: string[] = [];

  //* ### get all products
  ngOnInit(): void {
    this._EcomdataService.getAllProductss().subscribe({
      next: (response) => {
        this.productData = response.data;
        console.log(response.metadata);
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });
    //* get wish list
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        const data = response.data.map((item: any) => {
          return item._id;
        });
        this.wishlistData = data;
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
  //* ### pageChanged
  pageChanged(event: any): void {
    console.log(event);
    this._EcomdataService.getAllProductss(event).subscribe({
      next: (response) => {
        this.productData = response.data;
        console.log(response.metadata);
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });
  }
}
