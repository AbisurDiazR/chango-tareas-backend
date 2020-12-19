import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sesionmaestros',
  templateUrl: './sesionmaestros.component.html',
  styleUrls: ['./sesionmaestros.component.scss']
})
export class SesionmaestrosComponent implements OnInit {
  user = {
    correo: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router, private notifyService: NotificationService) { }

  ngOnInit(): void {
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
