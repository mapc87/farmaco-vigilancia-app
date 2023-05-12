import { Component, OnInit, TemplateRef } from '@angular/core';
import { farmaco } from 'src/app/admin/interfaces/farmaco.interface';
import { FarmacoServiceService } from 'src/app/admin/services/farmaco.service.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-farmacos',
  templateUrl: './modal-farmacos.component.html'
})


export class ModalFarmacosComponent implements OnInit {

  farmacos : farmaco[] = [];
  farmacosSeleccionados: farmaco[] = [];
  farmaco : farmaco = {
    nombre: '',
    casa: '',
    efectosAdversos: [],
    efectosAdversosNoReportados: [],
    observaciones: '',
    estado: false,
    seleccionado: false
  };

  constructor(
    private srvFarmacos: FarmacoServiceService,
    public modalRef: BsModalRef
  ){

}
  ngOnInit(): void {
    this.cargarFarmacos();
  }

  cargarFarmacos(){
    this.srvFarmacos.getFarmacos.subscribe(result => {
      this.farmacos = result; 
      this.farmacos.forEach(element => {
       element.seleccionado = false; 
      });
    })
  }

  guardar(){
    console.log(this.farmacosSeleccionados);
  }

  onTextBoxChangeFarmacos(farmaco : farmaco, event: any){
    console.log(farmaco);
  }


  agregar(farmaco:farmaco, event : any){

    this.farmaco = farmaco; 
    this.farmaco.seleccionado == true;  

     if(this.farmaco.seleccionado){
       this.farmacosSeleccionados.push(farmaco);
     }else{
      this.farmacosSeleccionados.splice(this.farmacosSeleccionados.findIndex(f => f._id == this.farmaco._id),1);
     }

     console.log(this.farmacosSeleccionados);

  }
}
