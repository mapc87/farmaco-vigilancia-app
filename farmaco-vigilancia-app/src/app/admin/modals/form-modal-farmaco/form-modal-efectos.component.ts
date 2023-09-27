import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


import { farmaco } from 'src/app/admin/interfaces/farmaco.interface';
import { FarmacoServiceService } from 'src/app/admin/services/farmaco.service.service';
import { efectosAdversos } from '../../interfaces/efectos-adversos.interface';
import { EfectosAdversosServiceService } from '../../services/efectos-adversos.service.service';
import { ToastrService } from 'ngx-toastr';
import { Action } from 'rxjs/internal/scheduler/Action';

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
 
      this.efectosSeleccionados = this.farmaco.efectosAdversos.map(e => e); 
      this.efectos = result.map(e => {     
        
        let efectoSeleccionado = this.efectosSeleccionados.filter( es => es._id == e._id)

        if(efectoSeleccionado.length > 0 ){ 
          e.seleccionado = true;         
          e.reportado = efectoSeleccionado[0].reportado;
        }else{
          e.seleccionado = false;
        }    
        return e;
      });         
     });         
  }

  updateEstadoReportadoEfecto(efecto:efectosAdversos){
    this.efectosSeleccionados.forEach((es, index) => {
      if(es._id == efecto._id){
        this.efectosSeleccionados[index].reportado = efecto.reportado;
      }
    });
  }

  updateFarmaco(farmaco: farmaco){
    this.efectosSeleccionados.forEach(es =>{
      if(es.seleccionado != undefined) {
        es.seleccionado = false
      }    
    });
    this.farmaco.efectosAdversos = this.efectosSeleccionados;
    this.srvFarmaco.updateFarmacos(farmaco).subscribe((result)=>{
      this.toastr.success("Efectos adversos actualizados");
      this.modalRef.hide();
    });
  }

  onTextBoxChangeReportados(efecto :efectosAdversos, event: any){
    let accion = event.target.checked
    
    if(accion){
      this.efectosSeleccionados.push(efecto);
      efecto.seleccionado = true;
    }else
    { 
      this.efectosSeleccionados.map((e, index) => {
        if(e._id == efecto._id){
          this.efectosSeleccionados.splice(index, 1);
          return true;
        }    
        return false;    
      })
      efecto.seleccionado = false;
    } 
  }
}
