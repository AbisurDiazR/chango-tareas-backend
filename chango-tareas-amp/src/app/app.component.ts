import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { ChatService } from './services/chat.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ChangoTareas';

  public chats: Observable<any[]>;
  mensajes = [];
  users = [];

  constructor(public authservice: AuthService, db: AngularFirestore, 
    public userService: UserService, public chatService: ChatService, 
    private titleService: Title, private metaService: Meta){
    this.chats = db.collection('chats').valueChanges();
  }

  ngOnInit(): void{
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'tareas, tareas en linea, tareas en casa'},
      {name: 'description', content: 'tareas tareas en linea tareas en casa'},
      {name: 'content', content: 'index, follow'}
    ]);

    this.userService.getId().subscribe(res => {
      this.users = res.data;
      console.log(this.users[0]._id);
      this.chatService.allMessage(this.users[0]._id).subscribe();
    });   
  }  
}
