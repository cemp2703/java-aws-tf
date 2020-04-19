import { PersonaService } from './../../_service/persona.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Persona } from './../../_model/persona';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  dataSource : MatTableDataSource<Persona>;
  displayedColumns = ['id','nombre','apellidos','edad','profesion','lugarTrabajo','lenguajeProgramacion'];
  @ViewChild(MatSort,{static : true}) sort : MatSort;
  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;

  title = 'encuestas';

  constructor(private personaService : PersonaService) { }

  ngOnInit() {
    this.personaService.listar().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor : string){
    this.dataSource.filter =valor.trim().toLowerCase();
  }

}
