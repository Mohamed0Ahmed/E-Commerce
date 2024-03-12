import { SettingComponent } from './components/setting/setting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  //*########### user show
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'Payment' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'allorders', component: AllOrdersComponent, title: 'AllOrders' },
      { path: 'wishlist', component: WishlistComponent, title: 'Wish List' },
      { path: 'product', component: ProductsComponent, title: 'Products' },
      { path: 'category', component: CategoriesComponent, title: 'Category' },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'setting', component: SettingComponent, title: 'Setting' },
      { path: 'profile', component: ProfileComponent, title: 'Profile' },
      { path: 'details/:id', component: DetailsComponent, title: 'Details' },
    ],
  },
  //*########## un user
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      {
        path: 'Forgetpassword',
        component: ForgetPassComponent,
        title: 'Forget Password',
      },
      { path: 'register', component: RegisterComponent, title: 'Register' },
    ],
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
