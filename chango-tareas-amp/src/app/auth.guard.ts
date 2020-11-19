import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //creamos el constructor
  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  canActivate(): boolean{
    //si el usuario esta logeado retorna true
    if (this.authService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
  
}
