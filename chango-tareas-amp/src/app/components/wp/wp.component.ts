import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-wp',
  templateUrl: './wp.component.html',
  styleUrls: ['./wp.component.scss']
})
export class WpComponent implements OnInit {
  admin = {
    correo: '',
    password: ''
  }

  constructor(private solicitudService: SolicitudService, 
    public notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.solicitudService.singInAdmin(this.admin).subscribe(
      (res:any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/wp-dashboard']);
      },
      err => {
        this.notificationService.showError(err.statusText,'Error');
      }
    );
  }
}
