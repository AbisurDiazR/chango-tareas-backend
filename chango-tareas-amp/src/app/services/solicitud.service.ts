import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  postSolicitud(solicitud){
    return this.http.post(this.URL+'/solicitud',solicitud);
  }

  getSolicitud(){
    return this.http.get<any>(this.URL+'/solicitudes');
  }

  updateSolicitud(parametros){
    return this.http.post<any>(this.URL+'/solicitudes',parametros);
  }

  singInAdmin(admin){
    return this.http.post(this.URL+'/signin',admin);
  }
}
