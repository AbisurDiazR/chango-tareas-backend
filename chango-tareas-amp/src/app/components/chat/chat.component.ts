import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { MercadopagoService } from 'src/app/services/mercadopago.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  title = 'Chat General';

  uploadPercent = new Observable<number>();
  downloadUrl = new Observable<string>();
  //urlPublica = '';
  file;
  pathImage = '';

  public idChat: string;

  producto = {
    back_urls: {
      success: 'https://changotareas.ml/success',
      failure: 'https://changotareas.ml/failure',
      pending: 'https://changotareas.ml/pending'
    },
    items: {
      title: '',
      unit_price: 0,
      quantity: 1
    },
    fee: 0
  };

  users = [];
  receptorEmisor = [];

  newMensaje = {
    chatName: '',
    contenido: '',
    emisor: '',
    receptor: '',
    fecha: 0
  };

  constructor(public chatService: ChatService, public userService: UserService,
    public route: ActivatedRoute, public mercaoPago: MercadopagoService,
    private notifyService: NotificationService, private titleService: Title,
    private metaService: Meta, private uploadService: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.idChat = this.route.snapshot.paramMap.get('id');

    this.userService.getId().subscribe(
      res => {
        this.users = res.data;
        this.chatService.cargarMensajes(this.idChat).subscribe();
      },
      err => {
        //console.log(err);
      }
    );
  }



  enviarMensaje() {
    if (this.pathImage.length != 0) {
      this.subirArchivo();
    } else {
      this.enviarTexto();
    }
  }

  enviarTexto() {
    this.idChat = this.route.snapshot.paramMap.get('id');
    this.receptorEmisor = this.idChat.split('-');

    this.newMensaje.chatName = this.idChat;
    this.newMensaje.emisor = this.users[0]._id;
    this.newMensaje.fecha = new Date().getTime();

    if (this.users[0]._id == this.receptorEmisor[0]) {
      this.newMensaje.receptor = this.receptorEmisor[1];
    } else {
      this.newMensaje.receptor = this.receptorEmisor[0];
    }

    /*console.log(this.newMensaje);*/

    if (this.newMensaje.contenido.length == 0) {
      return
    }

    this.chatService.agregarMensaje(this.newMensaje.contenido, this.users[0].nombre, this.users[0]._id, this.idChat)
      .then(() => {
        this.chatService.newMessage(this.newMensaje);
        this.newMensaje.contenido = "";
      })
      .catch((err) => {
        this.notifyService.showError(err.statusText, 'Error al enviar')
      });
  }

  enviarLinkPago() {
    //variable de descuento
    var descuento = this.producto.items.unit_price * 0.30;
    this.producto.fee = descuento;

    //this.notifyService.showInfo(this.producto.fee, 'Cuota');

    this.mercaoPago.crearPago(this.producto).subscribe(
      res => {

        this.idChat = this.route.snapshot.paramMap.get('id');
        this.receptorEmisor = this.idChat.split('-');

        this.newMensaje.chatName = this.idChat;
        this.newMensaje.contenido = res.data.init_point;
        this.newMensaje.emisor = this.users[0]._id;
        this.newMensaje.fecha = new Date().getTime();

        if (this.users[0]._id == this.receptorEmisor[0]) {
          this.newMensaje.receptor = this.receptorEmisor[1];
        } else {
          this.newMensaje.receptor = this.receptorEmisor[0];
        }

        if (this.newMensaje.contenido.length == 0) {
          return
        }

        this.chatService.agregarMensaje(this.newMensaje.contenido, this.users[0].nombre, this.users[0]._id, this.idChat)
          .then(() => {
            this.chatService.newMessage(this.newMensaje);
            this.newMensaje.contenido = "";
          })
          .catch((err) => {
            this.notifyService.showError(err.statusText, 'Error');
          });
      },
      err => {
        this.notifyService.showError(err.statusText, 'Error');
      }
    );
  }

  match(regex) {
    if (regex.match('http')) {
      return true;
    } else {
      return false;
    }
  }

  isFile(regex){
    if(regex.match('firebase')){
      return true;
    }else{
      return false;
    }
  }

  //metodo subir archivo
  subirArchivo() {
    let fileRef = this.uploadService.ref(this.pathImage);
    let task = this.uploadService.upload(this.pathImage, this.file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = fileRef.getDownloadURL();
        this.downloadUrl.subscribe((event) => {
          this.idChat = this.route.snapshot.paramMap.get('id');
          this.receptorEmisor = this.idChat.split('-');

          this.newMensaje.chatName = this.idChat;
          this.newMensaje.contenido = event;
          this.newMensaje.emisor = this.users[0]._id;
          this.newMensaje.fecha = new Date().getTime();

          if (this.users[0]._id == this.receptorEmisor[0]) {
            this.newMensaje.receptor = this.receptorEmisor[1];
          } else {
            this.newMensaje.receptor = this.receptorEmisor[0];
          }

          if (this.newMensaje.contenido.length == 0) {
            return
          }

          this.chatService.agregarMensaje(this.newMensaje.contenido, this.users[0].nombre, this.users[0]._id, this.idChat)
            .then(()=>{
              this.chatService.newMessage(this.newMensaje);
              this.newMensaje.contenido = "";
            })
            .catch((err) => {
              this.notifyService.showError(err.statusText,'Error Message');
            });

          this.notifyService.showInfo(this.newMensaje.contenido, 'Download Url');
        });
      })
    ).subscribe();
    this.pathImage = '';
  }

  //evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.notifyService.showInfo(`Archivo preparado ${event.target.files[0].name}`, 'Información');
        this.file = event.target.files[0];
        this.pathImage = event.target.files[0].name;
      }
    } else {
      this.notifyService.showInfo('No se ha cargado ningun archivo', 'Informacio');
    }
  }

}
