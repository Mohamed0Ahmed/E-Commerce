import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { MyHttpInterceptor } from './shared/interceptors/my-http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NavAuthComponent,
    NavBlankComponent,
    FooterComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    DetailsComponent,
    WishlistComponent,
    SearchPipe,
    CheckoutComponent,
    AllOrdersComponent,
    ForgetPassComponent,
    MainSliderComponent,
    ProfileComponent,
    SettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
