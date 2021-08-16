import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private URL = environment.rootUrl;

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
