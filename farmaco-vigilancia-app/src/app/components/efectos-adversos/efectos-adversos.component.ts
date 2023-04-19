import { Component, OnInit } from '@angular/core';
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
    observaciones: ''
  }
 
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
