import { Injectable } from '@angular/core';
import { CanActivate,RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { CONSTANTS } from '../url'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router :Router) { }
  canActivate(route,state:RouterStateSnapshot){
    if (sessionStorage.getItem(CONSTANTS.auth_token) == null) {
     this.router.navigate(['/login'],{
       queryParams:{
         returnUrl:state.url
       }
     });
     return false;
   }else{
     return true;
   }
  }
}
