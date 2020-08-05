import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { $ } from 'protractor';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
//implementamos el httpinterceptor que importamos
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  //en el metodo intercept obtenemos el token y lo asignamos
  //a la cabecera con el meto setHeaders
  intercept(req,next){
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })
    return next.handle(tokenizeReq);
  } 
}
