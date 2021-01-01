import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-registromaestros',
  templateUrl: './registromaestros.component.html',
  styleUrls: ['./registromaestros.component.scss']
})
export class RegistromaestrosComponent implements OnInit {
  title = 'Registro de estudiantes';

  niveles = ['Preparatoria', 'Universidad'];

  user = {
    nombre: '',
    correo: '',
    password: '',
    nivel: '',
    rol: '',
    materias: '',
    credenciales: {
      'access_token': '',
      'expires_in': 0,
      'live_mode': false,
      'public_key': '',
      'refresh_token': '',
      'scope': '',
      'token_type': '',
      'user_id': 0
    }
  }

  credencial = {
    client_secret: 'TEST-7278820777929276-112400-87a9751d1572934a08f4134b692ae467-151662073',
    grant_type: 'authorization_code',
    code: '',
    redirect_uri: 'https://localhost:4200/registromaestros'
  }

  constructor(private authService: AuthService, private router: Router,
    public route: ActivatedRoute, private notifyService: NotificationService,
    private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {meta: 'keywords', content: 'registro, maestros, changotareas'},
      {meta: 'description', content: 'registro de maestros changotareas'},
      {meta: 'content', content: 'registro, maestros'}
    ]);
  }

  signUp() {
    var code = this.getParameterByName('code');

    if (this.user.nombre.length == 0 || this.user.correo.length == 0
      || this.user.password.length == 0 || this.user.nivel.length == 0
      || this.user.materias.length == 0) {
      
        this.notifyService.showInfo('Rellene todos los campos por favor','Atención');

    } else {
      this.credencial.code = code;

      this.user.rol = 'Maestro';
      this.authService.getCredenciales(this.credencial).subscribe(
        res => {
          this.user.credenciales.access_token = res.data.access_token;
          this.user.credenciales.expires_in = res.data.expires_in;
          this.user.credenciales.live_mode = res.data.live_mode;
          this.user.credenciales.public_key = res.data.public_key;
          this.user.credenciales.refresh_token = res.data.refresh_token;
          this.user.credenciales.scope = res.data.scope;
          this.user.credenciales.token_type = res.data.scope;
          this.user.credenciales.user_id = res.data.user_id;

          console.log(res.data);
          
          this.authService.check(this.user).subscribe(
            res => {
              if (res.data == 'unavalaible') {
                this.notifyService.showError('Usuario ya existe', res.data);
              } else {
                this.authService.signUp(this.user).subscribe(
                  res => {
                    console.log(res);
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/home']);
                  },
                  err => {
                    this.notifyService.showError('Error de registro',err.statusText);
                  }
                );
              }
            }
          );

        }
      );
      //console.log(this.user);
    }
  }

  getParameterByName(sParametroNombre) {
    var sPaginaURL = window.location.search.substring(1);
    var sURLVariables = sPaginaURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParametro = sURLVariables[i].split('=');
      if (sParametro[0] == sParametroNombre) {
        return sParametro[1];
      }
    }
    return null;
  }

}
