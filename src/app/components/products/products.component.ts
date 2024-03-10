import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Categories } from 'src/app/shared/interfaces/categories';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  productNoSale: product[] = [];
  categoryData: Categories[] = [];
  serchTerm: string = '';
  wishlistData: string[] = [];
  layout2: boolean = false;
  layout12: boolean = false;
  layout4: boolean = true;
  show: string = 'All Products';
  onSale: boolean = true;
  layout: number = 4;
  generateRatingArray(ratingAverage: number): any[] {
    return Array.from({ length: ratingAverage }, (_, index) => index);
  }

  //* ### category slider
  catlisder: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  //* ### get all products
  ngOnInit(): void {
    this._EcomdataService.getAllProduct().subscribe({
      next: (response) => {
        this.productData = response.data;
        console.log(this.productData);
        this.productNoSale = this.productData;
      },
    });
    //* ### get categories

    this._EcomdataService.getcat().subscribe({
      next: (response) => {
        this.categoryData = response.data;
        console.log(response);
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
  //*#### layouts
  showGrid2(): void {
    this.layout = 2;
  }
  showGrid12(): void {
    this.layout = 12;
  }
  showGrid4(): void {
    this.layout = 4;
  }

  //* ### product or on sale
  showAll(): void {
    this.show = 'All Products';
    this.productData = this.productNoSale;
  }
  showOnSale(): void {
    this.show = 'On Sale';
    this.productData = this.productData.filter(
      (product) => product.price <= 300 || product.price > 1000
    );
  }
}
