import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../_model/persona';
import { Subject } from 'rxjs';
import { HOST_BACKEND } from '../_shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url : string = `${HOST_BACKEND}/api/personas`;
  
  mensajeCambio = new Subject<string>();

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Persona[]>(`${this.url}/listar`);
  }

  registrar(persona : Persona){
    return this.http.post(`${this.url}/registrar`, persona);
  }
}
