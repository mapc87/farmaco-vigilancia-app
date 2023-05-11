import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


import { farmaco } from 'src/app/admin/interfaces/farmaco.interface';
import { FarmacoServiceService } from 'src/app/admin/services/farmaco.service.service';
import { efectosAdversos } from '../../interfaces/efectos-adversos.interface';
import { EfectosAdversosServiceService } from '../../services/efectos-adversos.service.service';
import { ToastrService } from 'ngx-toastr';

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

  efectosReportados : efectosAdversos[] = [];
  efectosNoReportados : efectosAdversos[] = [];
  efectosReportadosSeleccionados: string[] = [];
  efectosNoReportadosSeleccionados: string[] = [];
  tipoEfecto: string = "";
  list: any[] = [];

  constructor(
    public modalRef: BsModalRef,
    private srvFarmaco: FarmacoServiceService,
    private srvEfectosAdversos: EfectosAdversosServiceService,
    private toastr: ToastrService) {
    this.insertar = true
  
  } 

  ngOnInit(): void {
    this.getEfectosAdversos();
    this.farmaco = this.list[0];   
  }
  
  titulo = "Registro de Efectos Adversos";

  guardar(){
    this.updateFarmaco(this.farmaco);
  }

  getEfectosAdversos(){
     this.srvEfectosAdversos.getEfectosAdversos.subscribe(result=>{     
     
      this.efectosReportadosSeleccionados = this.farmaco.efectosAdversos;   
      this.efectosReportados = result.map(e => {        
        if(this.efectosReportadosSeleccionados[this.efectosReportadosSeleccionados.indexOf(e.efectoAdverso)]){ 
          e.seleccionado  = true; 
        }else{
          e.seleccionado = false; 
        }        
        return e;
      });         
     });    

     this.srvEfectosAdversos.getEfectosAdversos.subscribe(result=>{ 
      this.efectosNoReportadosSeleccionados = this.farmaco.efectosAdversosNoReportados;    
      this.efectosNoReportados = result.map(e => {        
        if(this.efectosNoReportadosSeleccionados[this.efectosNoReportadosSeleccionados.indexOf(e.efectoAdverso)]){  
          e.seleccionado = true; 
        }else{
          e.seleccionado = false; 
        }        
        return e
      })         
     });  
  }

  updateFarmaco(farmaco: farmaco){
    console.log(farmaco);
    this.srvFarmaco.updateFarmacos(farmaco).subscribe((result)=>{
      this.toastr.success("Efectos adversos actualizados");
      console.log(farmaco);
    });
  }

  onTextBoxChangeReportados(efecto :efectosAdversos, event: any){
    let accion = event.target.checked
    if(accion){
      this.efectosReportadosSeleccionados.push(efecto.efectoAdverso);
    }else{
      this.efectosReportadosSeleccionados.splice(this.efectosReportadosSeleccionados.indexOf(efecto.efectoAdverso),1);
    } 
  }

  onTextBoxChangeNoReportados(efecto :efectosAdversos, event: any){
    let accion = event.target.checked
      if(accion){
        this.efectosNoReportadosSeleccionados.push(efecto.efectoAdverso);
      }else{
        this.efectosNoReportadosSeleccionados.splice(this.efectosNoReportadosSeleccionados.indexOf(efecto.efectoAdverso),1);
      }    
  }
}
