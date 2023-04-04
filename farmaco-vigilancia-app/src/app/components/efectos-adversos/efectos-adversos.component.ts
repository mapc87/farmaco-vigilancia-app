import { Component, OnInit } from '@angular/core';
import { efectosAdversos } from '../../interfaces/efectos-adversos.interface';
import { EfectosAdversosServiceService } from '../../services/efectos-adversos.service.service';

@Component({
  selector: 'app-efectos-adversos',
  templateUrl: './efectos-adversos.component.html',
  styleUrls: ['./efectos-adversos.component.css']
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
    console.log("agregar efecto");
  }

  getEfectosAdversos(){
    this.srvEfectoAdverso.getgetEfectosAdversos().subscribe(result => {
        this.efectosAdversos = result;
        console.log(this.efectosAdversos);
    });
  }

  getEfectoAdverso(id: string){
    this.srvEfectoAdverso.getEfectoAdverso(id).subscribe(result => this.efectoAdverso);
  }

  AddEfectoAdverso(id: string){
    this.srvEfectoAdverso.addgetEfectoAdverso(this.efectoAdverso).subscribe(result => {
      console.log("Insertados");
    }); 
  }

  updateEfectoAdverso(id: string){
    this.srvEfectoAdverso.updategetEfectoAdverso(this.efectoAdverso).subscribe(result => {
      console.log("actualizado");
    }); 
  }
}
