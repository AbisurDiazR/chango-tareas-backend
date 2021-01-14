import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  sendEmail(mensaje){
    return this.http.post(this.URL+'/send-email',mensaje);
  }

  notificar(mensaje){
    return this.http.post(this.URL+'/notificar',mensaje);
  }
}
