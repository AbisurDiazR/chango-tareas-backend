import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  private URL = environment.rootUrl;

  constructor(private http: HttpClient) { }

  crearPago(item){
    return this.http.post<any>(this.URL + '/mercadopago',item);
  }
}
