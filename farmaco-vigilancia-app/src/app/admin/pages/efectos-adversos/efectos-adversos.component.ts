import { Component, OnInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { efectosAdversos } from '../../interfaces/efectos-adversos.interface';
import { EfectosAdversosServiceService } from '../../services/efectos-adversos.service.service';


@Component({
  selector: 'app-efectos-adversos',
  templateUrl: './efectos-adversos.component.html'
})
export class EfectosAdversosComponent implements OnInit {

  efectosAdversos: efectosAdversos[] =[];
  efectoAdverso: efectosAdversos = {
    id: '',
    efectoAdverso: '',
    observaciones: '',
    estado: false
  }

  pageSize = 10;
  desde: number = 0; 
  hasta: number = 10;
 
  constructor(private srvEfectoAdverso: EfectosAdversosServiceService) {    
  }

  ngOnInit(): void {
    this.getEfectosAdversos();
  }

  agregarEfecto(){
    this.srvEfectoAdverso.addgetEfectoAdverso(this.efectoAdverso).subscribe();
  }

  getEfectosAdversos(){
    this.srvEfectoAdverso.getEfectosAdversos.subscribe(result => {
        this.efectosAdversos = result;
    });
  }

  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }

  getEfectoAdverso(id: string){
    this.srvEfectoAdverso.getEfectoAdverso(id).subscribe(result => this.efectoAdverso);
  }

  AddEfectoAdverso(id: string){
    this.srvEfectoAdverso.addgetEfectoAdverso(this.efectoAdverso).subscribe(result => {
      
    }); 
    this.getEfectosAdversos();
  }

  updateEfectoAdverso(efecto: efectosAdversos){
    // this.srvEfectoAdverso.updategetEfectoAdverso(this.efectoAdverso).subscribe(result => {
    //   console.log("actualizado");
    // }); 

    console.log("test" )
  }

  deaxtivarEfectoAdverso(efecto: efectosAdversos){
    console.log(efecto)

  }
}
