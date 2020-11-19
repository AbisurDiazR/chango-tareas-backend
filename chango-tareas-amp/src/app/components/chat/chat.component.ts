import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public idChat: string;

  //mensaje: String = "";

  users = [];
  receptorEmisor = [];

  newMensaje = {
    chatName: '',
    contenido: '',
    emisor: '',
    receptor: '',
    fecha: 0
  };

  constructor(public chatService: ChatService, public userService: UserService, public route: ActivatedRoute) {    
  }

  ngOnInit(): void {
    this.idChat = this.route.snapshot.paramMap.get('id');

    this.userService.getId().subscribe(
      res => {
        this.users = res.data;
        this.chatService.cargarMensajes(this.idChat).subscribe();
      },
      err => {
        console.log(err);
      }
    );        
  }

  enviarMensaje(){

    this.idChat = this.route.snapshot.paramMap.get('id');
    this.receptorEmisor = this.idChat.split('-');
    console.log(this.receptorEmisor[0]);

    
    this.newMensaje.chatName = this.idChat;
    this.newMensaje.receptor = this.receptorEmisor[0];
    this.newMensaje.emisor = this.users[0]._id;
    this.newMensaje.fecha = new Date().getTime();
    

    console.log(this.newMensaje);

    if (this.newMensaje.contenido.length == 0) {
      return
    }    

    this.chatService.agregarMensaje(this.newMensaje.contenido, this.users[0].nombre, this.users[0]._id, this.idChat)
      .then(() => {
        this.chatService.newMessage(this.newMensaje);        
        this.newMensaje.contenido = "";               
      })
      .catch((err) => {
        console.log('Error al enviar: ',err)
      });
      
  }

}
