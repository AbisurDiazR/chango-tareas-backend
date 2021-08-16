import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private URL = environment.rootUrl;

  constructor(private http: HttpClient) { }

  sendEmail(mensaje){
    return this.http.post(this.URL+'/send-email',mensaje);
  }

  notificar(mensaje){
    return this.http.post(this.URL+'/notificar',mensaje);
  }
}
