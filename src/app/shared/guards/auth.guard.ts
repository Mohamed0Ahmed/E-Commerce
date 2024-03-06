import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {



  let _router = inject(  Router  )



  //* if user logged in
  if (localStorage.getItem('eToken')) return true;

  //* if user logged out 
  else {
    
    _router.navigate(["/login"])
    
    
    return false;}
};
