import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevaEncuestaComponent } from './pages/nueva-encuesta/nueva-encuesta.component';


const routes: Routes = [
  { path : 'encuestas', component : EncuestasComponent},
  { path : 'nueva-encuesta', component : NuevaEncuestaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
