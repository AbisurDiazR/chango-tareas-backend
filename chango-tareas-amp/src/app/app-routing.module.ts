import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//componentes
import {PrivateTaskComponent} from '../app/components/private-task/private-task.component';
import {TaskComponent} from '../app/components/task/task.component';
import {SigninComponent} from '../app/components/signin/signin.component';
import {SignupComponent} from '../app/components/signup/signup.component';
//importamos el guard para proteger las rutas
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SesionestudiantesComponent } from './components/sesionestudiantes/sesionestudiantes.component';
import { SesionmaestrosComponent } from './components/sesionmaestros/sesionmaestros.component';
import { RegistroestudiantesComponent } from './components/registroestudiantes/registroestudiantes.component';
import { RegistromaestrosComponent } from './components/registromaestros/registromaestros.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'private',
    component: PrivateTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'sesionestudiantes',
    component: SesionestudiantesComponent
  },
  {
    path: 'sesionmaestros',
    component: SesionmaestrosComponent
  },
  {
    path: 'registroestudiantes',
    component: RegistroestudiantesComponent
  },
  {
    path: 'registromaestros',
    component: RegistromaestrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
