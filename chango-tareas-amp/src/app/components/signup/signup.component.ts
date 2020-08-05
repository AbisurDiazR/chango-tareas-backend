import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  //objeto roles
  roles = ['profesor','estudiante'];

  //objeto usuarios
  user = {
    nombre: '',
    correo: '',
    password: '',
    rol: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router //exportamos el modulo router de angular
    ) { }

  ngOnInit(): void {
  }

  signUp(){
    this.authService.signUp(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token',res.token);
        this.router.navigate(['/private']);
      },
      err => console.log(err)
    );
    console.log(this.user);
  }

}
