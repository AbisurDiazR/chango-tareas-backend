import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private URL = "https://chango-tareas-backend.herokuapp.com/api"

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user){
    return this.http.post<any>(this.URL + '/signup',user);
  }

  signInUser(user: { correo: string; password: string; }) {
    return this.http.post<any>(this.URL + '/signin',user);
  }

  //comprobamos que el usuario este logeado
  loggedIn(){
    //comprobamos si el usuario tiene el token
    return !!localStorage.getItem('token');
  }

  //creamos el metodo para retornar el token guardado en el local storage
  getToken(){
    return localStorage.getItem('token');
  }

  //creamos el metodo para cerrar sesión, 
  //este remueve el token y redirecciona
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
