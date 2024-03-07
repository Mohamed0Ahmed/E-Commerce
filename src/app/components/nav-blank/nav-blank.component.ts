import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
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
    private _WishlistService: WishlistService,
    private elementRef: ElementRef
  ) {}

  @ViewChild('collapsibleNav')
  collapsibleNav!: ElementRef;

  //* variables
  scrolled: boolean = false;
  navCartNum: number = 0;
  wishlistNum: number = 0;
  windowWidth: number = 0;

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
      },
    });
    this.windowWidth = window.innerWidth;

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
