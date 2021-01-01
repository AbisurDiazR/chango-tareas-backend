import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sesionmaestros',
  templateUrl: './sesionmaestros.component.html',
  styleUrls: ['./sesionmaestros.component.scss']
})
export class SesionmaestrosComponent implements OnInit {
  title = 'Inicio de sesión maestros';

  user = {
    correo: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router, 
    private notifyService: NotificationService, private titleService: Title,
    private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {meta: 'keywords', content: 'inicio, sesion, maestros, changotareas'},
      {meta: 'description', content: 'inicio de sesion maeestros changotareas'},
      {meta: 'content', content: 'sesion, maestros'}
    ]);
  }

  signIn(){
    this.authService.signInUser(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      err => {
        this.notifyService.showInfo('Usuario o contraseña incorrectos',err.statusText)
      }
    );
  }

}
