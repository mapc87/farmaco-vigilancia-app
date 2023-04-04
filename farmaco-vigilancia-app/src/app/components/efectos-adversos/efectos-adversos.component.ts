import { Component } from '@angular/core';
import { efectosAdversos } from '../../interfaces/efectos-adversos.interface';

@Component({
  selector: 'app-efectos-adversos',
  templateUrl: './efectos-adversos.component.html',
  styleUrls: ['./efectos-adversos.component.css']
})
export class EfectosAdversosComponent {

  efectosAdversos: efectosAdversos[] =[];

  agregarEfecto(){
    console.log("agregar efecto");
  }

}
