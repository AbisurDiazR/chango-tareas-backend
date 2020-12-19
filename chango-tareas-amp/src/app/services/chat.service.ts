import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators'; 
import { UserService } from './user.service';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private URL = 'https://chango-tareas-backend.herokuapp.com/api';

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  private otherCollection: AngularFirestoreCollection<Mensaje>;
  private collectionMessage: AngularFirestoreCollection<Message>;

  public chats: Mensaje[] = [];
  public messages: Message[] = [];

  public usuar: any = {};

  constructor(private afs: AngularFirestore, public userService: UserService, private http: HttpClient) { 
    this.itemsCollection = afs.collection<Mensaje>('ChatRooms');
    this.collectionMessage = afs.collection<Message>('AllMessages');       
  }

  ngOnInit(): void{
    this.userService.getId().subscribe(
      res => {
        //console.log(res.data);
        this.usuar.nombre = res.data.nombre;
        this.usuar.uid = res.data._id;
      },
      err => {
        //console.log(err);
      }
    );
  }

  cargarMensajes(id: string){
    this.otherCollection = this.afs.collection<Mensaje>('ChatRooms').doc(id).collection('mensajes', ref => ref.orderBy('fecha','desc').limit(5));

    return this.otherCollection.valueChanges().pipe(map((mensajes: Mensaje[])=>{
      this.chats = [];
      for(let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
      //console.log(this.chats);

      return this.chats;
    }));
  }

  agregarMensaje(texto: string, currentname: string, id: string, chatRoom: string){
    let mensaje: Mensaje = {
      nombre: currentname,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: id
    }

    return this.itemsCollection.doc(chatRoom).collection('mensajes').add(mensaje);
  }

  newMessage(mensaje){ 
    //return this.http.post<any>(this.URL + '/newMessage',mensaje);
    let message: Message = mensaje;

    return this.collectionMessage.add(message);
  }

  allMessage(receptor: string){
    //console.log('Paramentro: '+receptor);
    this.collectionMessage = this.afs.collection<Message>('AllMessages', ref => ref.orderBy('fecha','desc').limit(5));

    return this.collectionMessage.valueChanges().pipe(map((arrayMessages: Message[]) => {
      this.messages = [];
      for (let item of arrayMessages) {
        //console.log('Valor item: '+item.receptor);
        if (item.receptor == receptor) {
          this.messages.unshift(item);
        }        
      }
      //console.log(this.messages);

      return this.messages;
    }));
  }
}
