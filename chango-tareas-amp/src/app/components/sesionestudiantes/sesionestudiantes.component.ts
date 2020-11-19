import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sesionestudiantes',
  templateUrl: './sesionestudiantes.component.html',
  styleUrls: ['./sesionestudiantes.component.scss']
})
export class SesionestudiantesComponent implements OnInit {
  //objeto user
  user = {
    correo: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.authService.signInUser(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      err => console.log(err)
    );
  }

}
