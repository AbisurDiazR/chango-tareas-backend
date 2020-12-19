import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-registroestudiantes',
  templateUrl: './registroestudiantes.component.html',
  styleUrls: ['./registroestudiantes.component.scss']
})
export class RegistroestudiantesComponent implements OnInit {
  niveles = ['Preparatoria', 'Universidad'];

  user = {
    nombre: '',
    correo: '',
    password: '',
    nivel: '',
    rol: '',
  }

  constructor(private authService: AuthService, private router: Router, 
     private notifyService: NotificationService) { }

  ngOnInit(): void {
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
