import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registromaestros',
  templateUrl: './registromaestros.component.html',
  styleUrls: ['./registromaestros.component.scss']
})
export class RegistromaestrosComponent implements OnInit {
  niveles = ['Preparatoria','Universidad'];

  user = {
    nombre: '',
    correo: '',
    password: '',
    nivel: '',
    rol: '',
    materias: ''
  }  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp(){
    this.user.rol = 'Maestro';
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
