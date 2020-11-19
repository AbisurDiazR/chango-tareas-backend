import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registroestudiantes',
  templateUrl: './registroestudiantes.component.html',
  styleUrls: ['./registroestudiantes.component.scss']
})
export class RegistroestudiantesComponent implements OnInit {
  niveles = ['Preparatoria','Universidad'];

  user = {
    nombre: '',
    correo: '',
    password: '',
    nivel: '',
    rol: '',
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp(){
    this.user.rol = 'Estudiante';
    this.authService.signUp(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token',res.token);
        this.router.navigate(['/home']);
      },
      err => console.log(err)
    );
    console.log(this.user);
  }

}
