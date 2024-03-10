import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
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

  @ViewChild('collapsibleNav')
  collapsibleNav!: ElementRef;

  //* variables
  scrolled: boolean = false;
  navCartNum: number = 0;
  wishlistNum: number = 0;
  windowWidth: number = 0;
  shake: boolean = false;
  shakeCart: boolean = false;
  wishlistUpdated: boolean = false;
  carUpdate: boolean = false;

  logoutUser(): void {
    this._AuthService.logout();
  }

  closeToggler(): void {
    const navbarToggler = this.collapsibleNav.nativeElement;
    if (navbarToggler.classList.contains('show')) {
      navbarToggler.classList.remove('show');
    }
  }

  ngOnInit(): void {
    this._CartService.cartNubmer.subscribe({
      next: (num) => {
        this.navCartNum = num;
        if (this.carUpdate) {
          this.shakeCart = true;
          setTimeout(() => {
            this.shakeCart = false;
          }, 3000);
        } else {
          this.carUpdate = true;
        }
      },
    });
    this.windowWidth = window.innerWidth;

    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.navCartNum = response.numOfCartItems;
      },
    });
    //*#### get wish list num
    this._WishlistService.wishNumber.subscribe({
      next: (num) => {
        this.wishlistNum = num;
        if (this.wishlistUpdated) {
          this.shake = true;
          setTimeout(() => {
            this.shake = false;
          }, 3000);
        } else {
          this.wishlistUpdated = true;
        }
      },
    });
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        console.log(response);
        this.wishlistNum = response.count;
      },
    });
  }
  //* ### scrolled
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 10 || this.windowWidth < 992) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }
}
