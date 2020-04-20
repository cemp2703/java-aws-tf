import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './pages/security/security.component';
import { GuardService } from './_services/guard.service';
import { LogoutComponent } from './pages/logout/logout.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { BodyComponent } from './pages/body/body.component';
import { LoginComponent } from './pages/login/login.component';
import { NuevaEncuestaComponent } from './pages/nueva-encuesta/nueva-encuesta.component';
import { EncuestasComponent } from './pages/admin/encuestas/encuestas.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuardService]},
  {path: 'logout', component: LogoutComponent},
  {path: 'security', component: SecurityComponent},
  {path: 'app', component: BodyComponent, children: [
    {path: 'nueva-encuesta', component: NuevaEncuestaComponent},
    {path: 'admin', component: AdminComponent, children: [
      {path: 'encuestas', component: EncuestasComponent}
   ]},
  ], canActivate: [GuardService]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
