import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PersonaService } from 'src/app/_services/persona.service';
import { MatSnackBar } from '@angular/material';
import { Persona } from 'src/app/_model/persona';

@Component({
  selector: 'app-nueva-encuesta',
  templateUrl: './nueva-encuesta.component.html',
  styleUrls: ['./nueva-encuesta.component.css']
})
export class NuevaEncuestaComponent implements OnInit {

  form: FormGroup;

  constructor(private personaService : PersonaService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = new FormGroup({
      'nombre': new FormControl(''),
      'apellidos' : new FormControl(''),
      'edad' : new FormControl(),
      'profesion': new FormControl(''),
      'lugarTrabajo': new FormControl(''),
      'lenguajeProgramaciónSeleccionado': new FormControl()
    })

    this.personaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });
  }

  estadoBotonRegistrar() {
    return (
      this.form.get('nombre').value.lenght < 50 || 
      this.form.get('apellidos').value.lenght < 50 ||
      this.form.get('edad').invalid ||
      this.form.get('profesion').value.lenght < 20 ||
      this.form.get('lugarTrabajo').value.lenght < 30 
      //this.form.get('lenguajeProgramaciónSeleccionado').value.lenght < 50
      );
  }

  operar() {

    let pers = new Persona();
    pers.nombre = this.form.get('nombre').value;
    pers.apellidos = this.form.get('apellidos').value
    pers.edad = this.form.get('edad').value
    pers.profesion = this.form.get('profesion').value
    pers.lugarTrabajo = this.form.get('lugarTrabajo').value
    pers.lenguajeProgramacion = this.form.get('lenguajeProgramaciónSeleccionado').value

    console.log(pers);
    this.personaService.registrar(pers).subscribe(() => {
      this.personaService.mensajeCambio.next('Se registró encuesta!');
      this.limpiarControles();
    });

  }
  
  limpiarControles(){
    this.form.get('nombre').setValue('');
    this.form.get('apellidos').setValue('');
    this.form.get('edad').setValue('');
    this.form.get('profesion').setValue('');
    this.form.get('lugarTrabajo').setValue('');
    this.form.get('lenguajeProgramaciónSeleccionado').setValue('');
  }

}
