import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sesionestudiantes',
  templateUrl: './sesionestudiantes.component.html',
  styleUrls: ['./sesionestudiantes.component.scss']
})
export class SesionestudiantesComponent implements OnInit {
  title = 'Inicio de sesión alumnos';

  //objeto user
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
      {meta: 'keywords', content: 'inicio, sesion, alumnos, changotareas'},
      {meta: 'description', content: 'inicio de sesion alumnos changotareas'},
      {meta: 'content', content: 'sesion, alumnos'}
    ]);
  }

  signIn(){
    this.authService.signInUser(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      err => {
        this.notifyService.showInfo('Usuario o contraseña incorrectos',err.statusText);
      }
    );
  }

}
