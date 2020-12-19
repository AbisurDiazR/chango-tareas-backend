import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  private URL = 'https://chango-tareas-backend.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  crearPago(item){
    return this.http.post<any>(this.URL + '/mercadopago',item);
  }
}
