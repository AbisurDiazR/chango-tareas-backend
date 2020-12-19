import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { MercadopagoService } from 'src/app/services/mercadopago.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public idChat: string;

  producto = {
    back_urls: {
      success: 'http://localhost:4200/success',
      failure: 'http://localhost:4200/failure',
      pending: 'http://localhost:4200/pending'
    },
    items: {
      title: '',
      unit_price: 0,
      quantity: 1
    }
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
    public route: ActivatedRoute, public mercaoPago: MercadopagoService, private notifyService: NotificationService) {
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

    this.idChat = this.route.snapshot.paramMap.get('id');
    this.receptorEmisor = this.idChat.split('-');
    //console.log(this.users[0].nombre);


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
        this.notifyService.showError(err.statusText,'Error al enviar')
      });

  }

  enviarLinkPago() {
    this.mercaoPago.crearPago(this.producto).subscribe(
      res => {
        //this.pagos = res.data;
        /*console.log(res.data.sandbox_init_point);*/

        this.idChat = this.route.snapshot.paramMap.get('id');
        this.receptorEmisor = this.idChat.split('-');
        //console.log(this.receptorEmisor[0]);

        this.newMensaje.chatName = this.idChat;
        this.newMensaje.contenido = res.data.sandbox_init_point;
        this.newMensaje.emisor = this.users[0]._id;
        this.newMensaje.fecha = new Date().getTime();

        if (this.users[0]._id == this.receptorEmisor[0]) {
          this.newMensaje.receptor = this.receptorEmisor[1];
        } else {
          this.newMensaje.receptor = this.receptorEmisor[0];
        }

        //console.log(this.newMensaje);

        if (this.newMensaje.contenido.length == 0) {
          return
        }    

        this.chatService.agregarMensaje(this.newMensaje.contenido, this.users[0].nombre, this.users[0]._id, this.idChat)
          .then(() => {
            this.chatService.newMessage(this.newMensaje);        
            this.newMensaje.contenido = "";               
          })
          .catch((err) => {
            this.notifyService.showError(err.statusText,'Error');
          });
      },
      err => {
        this.notifyService.showError(err.statusText,'Error');
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

}
