import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//componentes
import {PrivateTaskComponent} from '../app/components/private-task/private-task.component';
import {TaskComponent} from '../app/components/task/task.component';
import {SigninComponent} from '../app/components/signin/signin.component';
import {SignupComponent} from '../app/components/signup/signup.component';
//importamos el guard para proteger las rutas
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/task',
    pathMatch: 'full'
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
