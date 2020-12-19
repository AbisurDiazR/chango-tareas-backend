import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'https://chango-tareas-backend.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  getId(){
    return this.http.get<any>(this.URL + '/home');
  }

  getMensajes(){
    return this.http.get<any>(this.URL + '/mensajes');
  }

  getUsers(user: { nivel: string, rol: string }){
    return this.http.post<any>(this.URL + '/users',user);
  }
}
