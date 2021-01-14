import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { RegistroestudiantesComponent } from './components/registroestudiantes/registroestudiantes.component';
import { RegistromaestrosComponent } from './components/registromaestros/registromaestros.component';
import { SesionmaestrosComponent } from './components/sesionmaestros/sesionmaestros.component';
import { SesionestudiantesComponent } from './components/sesionestudiantes/sesionestudiantes.component';
import { ChatComponent } from './components/chat/chat.component';

//importamos el modulo toast
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FailureComponent } from './components/failure/failure.component';
import { PendingComponent } from './components/pending/pending.component';
import { SuccessComponent } from './components/success/success.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { WpComponent } from './components/wp/wp.component';
import { WpDashboardComponent } from './components/wp-dashboard/wp-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroestudiantesComponent,
    RegistromaestrosComponent,
    SesionmaestrosComponent,
    SesionestudiantesComponent,
    ChatComponent,
    FailureComponent,
    PendingComponent,
    SuccessComponent,
    SolicitudComponent,
    WpComponent,
    WpDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
