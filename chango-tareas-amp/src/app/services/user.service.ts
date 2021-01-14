import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'http://localhost:3000/api';

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

  listUsers(){
    return this.http.get<any>(this.URL + '/users');
  }

  dropUser(parametros){
    return this.http.post<any>(this.URL+'/user',parametros);
  }
}
