import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../_model/persona';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  mensajeCambio = new Subject<string>();

  url : string = `${environment.PERSONA_HOST}/api/personas`;

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Persona[]>(`${this.url}/listar`);
  }

  registrar(persona : Persona){
    return this.http.post(`${this.url}/registrar`, persona);
  }
}
