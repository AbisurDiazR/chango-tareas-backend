import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wp-dashboard',
  templateUrl: './wp-dashboard.component.html',
  styleUrls: ['./wp-dashboard.component.scss']
})
export class WpDashboardComponent implements OnInit {
  status: boolean = true;

  //opciones
  solicitudes: boolean = true;
  usuarios: boolean = false;

  users = [];
  recibidas = [];

  parametros = {
    id: ''
  }

  paramSolicitud = {
    id: '',
    estatus: ''
  }

  mensaje = {nombre: '', mensaje: '', url: '', destino: ''}

  imageAlumno: string = 'https://image.flaticon.com/icons/png/512/2886/2886008.png';
  imageMaestro: string = 'https://image.flaticon.com/icons/png/512/46/46139.png';
  imageAdmin: string = 'https://media.istockphoto.com/vectors/manager-icon-design-vector-id1014120620?k=6&m=1014120620&s=170667a&w=0&h=12cEYoSVejHGw7r9xxk-Qp6yGjYDRCNp0EFR48wy7fM=';

  constructor(private userServices: UserService, private solicitudService: SolicitudService,
    private notificationService: NotificationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.listarUsuarios();
    this.listarSolicitudes();
  }
  

  cambiarToggle(){
    this.status = !this.status;
  }

  cambiarOpciones(){
    this.solicitudes = !this.solicitudes;
    this.usuarios = !this.usuarios;
  }

  listarSolicitudes(){
    this.solicitudService.getSolicitud().subscribe(
      res => {
        this.recibidas = res.data;
      }
    );
  }

  listarUsuarios(){
    this.userServices.listUsers().subscribe(
      res => {
        this.users = res.data;
      }
    );
  }

  aceptar(id, nombre, destino){
    this.paramSolicitud.id = id;
    this.paramSolicitud.estatus = 'Aceptada';
    this.solicitudService.updateSolicitud(this.paramSolicitud).subscribe(
      res => {
        this.notificationService.showSuccess(`${res.estatus}`,res.message);

        this.mensaje.nombre = nombre;
        this.mensaje.destino = destino;
        this.mensaje.mensaje = `Felicidades ${nombre} ha sido aceptado en ChangoTareas`;
        this.mensaje.url = 'https://auth.mercadopago.com.mx/authorization?client_id=5324311744444569&response_type=code&platform_id=mp&redirect_uri=https://changotareas.com/registromaestros';

        this.messageService.notificar(this.mensaje).subscribe((res) => {
          this.notificationService.showInfo('La respuesta ha sido enviada','Respuesta enviada');
        });

        this.listarSolicitudes();
      }
    );
  }

  eliminar(id, nombre, destino){
    this.paramSolicitud.id = id;
    this.paramSolicitud.estatus = 'Rechazada';
    this.solicitudService.updateSolicitud(this.paramSolicitud).subscribe(
      res => {
        this.notificationService.showError(`${res.estatus}`,res.message);

        this.mensaje.nombre = nombre;
        this.mensaje.destino = destino;
        this.mensaje.mensaje = `Sr. ${nombre} su solicitud ha sido rechazada en ChangoTareas`;
        this.mensaje.url = '';

        this.messageService.notificar(this.mensaje).subscribe((res) => {
          this.notificationService.showSuccess('La respuesta ha sido enviada','Respuesta enviada');
        });

        this.listarSolicitudes();
      }
    );
  }

  eliminarUsuario(id){
    this.parametros.id = id;
    //this.notificationService.showInfo(this.parametros.id,'Id seleccionado');
    this.userServices.dropUser(this.parametros).subscribe(
      res => {
        this.notificationService.showSuccess(res.message,'Success');
        this.listarUsuarios();
      }
    );
  }

}
