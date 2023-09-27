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
    observaciones: '',
    estado: false
  }
 
  efectos: efectosAdversos[] = [];
  efectosSeleccionados: efectosAdversos[] = [];

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
     
      this.efectosSeleccionados = this.farmaco.efectosAdversos;   

      this.efectos = result.map(e => {        
        if(this.efectosSeleccionados[this.efectosSeleccionados.indexOf(e)]){ 
          e.seleccionado  = true; 
        }else{
          e.seleccionado = false; 
        }        
        return e;
      });         
     });         
  }

  updateFarmaco(farmaco: farmaco){
    console.log(farmaco);
    this.srvFarmaco.updateFarmacos(farmaco).subscribe((result)=>{
      this.toastr.success("Efectos adversos actualizados");
      this.modalRef.hide();
    });
  }

  onTextBoxChangeReportados(efecto :efectosAdversos, event: any){
    let accion = event.target.checked
    if(accion){
      this.efectosSeleccionados.push(efecto);
    }else{
      this.efectosSeleccionados.splice(this.efectosSeleccionados.indexOf(efecto),1);
    } 
  }


}
