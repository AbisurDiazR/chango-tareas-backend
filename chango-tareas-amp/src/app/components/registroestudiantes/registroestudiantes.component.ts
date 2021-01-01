import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-registroestudiantes',
  templateUrl: './registroestudiantes.component.html',
  styleUrls: ['./registroestudiantes.component.scss']
})
export class RegistroestudiantesComponent implements OnInit {
  title = 'Registro de maestros';

  niveles = ['Preparatoria', 'Universidad'];

  user = {
    nombre: '',
    correo: '',
    password: '',
    nivel: '',
    rol: '',
  }

  constructor(private authService: AuthService, private router: Router, 
    private notifyService: NotificationService, private titleService: Title,
    private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {meta: 'keywords', content: 'registro, alumnos, changotareas'},
      {meta: 'description', content: 'registro de alumnos changotareas'},
      {meta: 'content', content: 'registro, alumnos'}
    ]);
  }

  signUp() {
    if (this.user.nombre.length == 0 || this.user.correo.length == 0
      || this.user.password.length == 0 || this.user.nivel.length == 0) {
        
        this.notifyService.showInfo('Faltan datos por llenar','Atención');

    } else {
      this.user.rol = 'Estudiante';
      this.authService.signUp(this.user).subscribe(
        res => {
          //console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        err => {
          this.notifyService.showError('Error de registro',err.statusText);
        }
      );
      //console.log(this.user);

    }
  }

}
