import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
