import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


import { farmaco } from 'src/app/admin/interfaces/farmaco.interface';
import { FarmacoServiceService } from 'src/app/admin/services/farmaco.service.service';
import { efectosAdversos } from '../../interfaces/efectos-adversos.interface';
import { EfectosAdversosServiceService } from '../../services/efectos-adversos.service.service';

@Component({
  selector: 'modal-efectos',
  templateUrl: './efectos-modal.component.html'
})

export class ModalEfectosComponent implements OnInit {
  insertar:boolean = true; 


 
  farmaco: farmaco ={
    nombre: '',
    casa: '',
    efectosAdversos: [],
    efectosAdversosNoReportados: [],
    observaciones: '',
    estado: false
  }

  efectos : efectosAdversos[] = [];
  efectosReportadosSeleccionados: string[] = [];
  efectosNoReportadosSeleccionados: string[] = [];
  tipoEfecto: string = "";
  list: any[] = [];

  constructor(
    public modalRef: BsModalRef,
    private srvFarmaco: FarmacoServiceService,
    private srvEfectosAdversos: EfectosAdversosServiceService) {
    this.insertar = true; 
  } 

  ngOnInit(): void {
    this.getEfectosAdversos();
    this.farmaco = this.list[0];
  }
  
  titulo = "Registro de Efectos Adversos";

  guardar(){
    if(parseInt(this.tipoEfecto) == 1){
      this.farmaco.efectosAdversos = this.efectosReportadosSeleccionados;
      console.log("Reportados")
    }    else{
      this.farmaco.efectosAdversosNoReportados = this.efectosNoReportadosSeleccionados;
      console.log("No Reportados")
    }
    console.log(this.farmaco);
    this.updateFarmaco(this.farmaco);
  }

  getEfectosAdversos(){
     this.srvEfectosAdversos.getEfectosAdversos.subscribe(result=>{
      this.efectos = result; 
      console.log(this.efectos);
     })
  }

  updateFarmaco(farmaco: farmaco){
    this.srvFarmaco.updateFarmacos(farmaco).subscribe((result)=>{
      console.log("guardado", result);
    });
  }

  onTextBoxChange(efecto :efectosAdversos, event: any){
    console.log(efecto)
    console.log(event.target.checked)

    let accion = event.target.checked

    if(parseInt(this.tipoEfecto) == 1){
      if(accion){
        this.efectosReportadosSeleccionados.push(efecto.efectoAdverso);
      }else{
        this.efectosReportadosSeleccionados.splice(this.efectosReportadosSeleccionados.indexOf(efecto.efectoAdverso),1);
      }      
      console.log("Reportados")
      console.log(this.efectosReportadosSeleccionados);
    }else{
      if(accion){
        this.efectosNoReportadosSeleccionados.push(efecto.efectoAdverso);
      }else{
        this.efectosNoReportadosSeleccionados.splice(this.efectosNoReportadosSeleccionados.indexOf(efecto.efectoAdverso),1);
      }
      console.log(this.efectosNoReportadosSeleccionados);
      console.log("No Reportados")
    }
  }
}
