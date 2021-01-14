import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
  downloadUrl = new Observable<string>();
  uploadPercent = new Observable<number>();

  file;
  pathImage = '';

  mensaje = {
    nombre: '',
    email: '',
    mensaje: '',
    url: '',
    destino: ''
  }

  solicitud = {
    nombreSolicitante: '',
    correoSolicitante: '',
    cvSolicitante: '',
    estatusSolicitud: '',
  }

  constructor(private notifyService: NotificationService, private messageService: MessageService,
    private uploadService: AngularFireStorage, private solicitudService: SolicitudService) { }

  ngOnInit(): void {
  }

  //evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event){
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.notifyService.showInfo(`Archivo preparado ${event.target.files[0].name}`, 'Información');
        this.file = event.target.files[0];
        this.pathImage = event.target.files[0].name;
      }
    } else {
      this.notifyService.showInfo('No se ha cargado ningun archivo','Informacion');
    }
  }

  //evento para enviar el correo electronico
  sendMail(){
    if (this.mensaje.email.length != 0 && this.mensaje.nombre.length != 0 
      && this.mensaje.mensaje.length != 0 && this.pathImage.length != 0) {
      //subimos el archivo cv del usuario
      let fileRef = this.uploadService.ref(`solicitudes/${this.pathImage}`);
      let task = this.uploadService.upload(`solicitudes/${this.pathImage}`,this.file);
      
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadUrl = fileRef.getDownloadURL();
          this.downloadUrl.subscribe((event) => {
            this.mensaje.url = event;
            this.mensaje.destino = 'tec.abisurdiaz@gmail.com';
            
            //service para registrar la solicitud
            this.solicitud.nombreSolicitante = this.mensaje.nombre;
            this.solicitud.correoSolicitante = this.mensaje.email;
            this.solicitud.cvSolicitante = event;
            this.solicitud.estatusSolicitud = 'Pendiente';
            console.log(this.solicitud);
            this.solicitudService.postSolicitud(this.solicitud).subscribe((res) => {
              console.log(res);
            });
            
            //service para enviar el correo 
            this.messageService.sendEmail(this.mensaje).subscribe((res) => {
              this.mensaje.nombre = '';
              this.mensaje.email = '';
              this.mensaje.mensaje = '';
              this.mensaje.url = '';
              this.mensaje.destino = '';
              this.pathImage = '';              

              this.notifyService.showInfo('Nosotros te contactamos','Solicitud enviada');
            });
          });
        })
      ).subscribe();
    } else {
      this.notifyService.showError('Debe llenar toda la solicitud','Alerta');
    }
  }

}
