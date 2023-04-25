import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { farmaco } from 'src/app/interfaces/farmaco.interface';
import { CasaFarmaceuticaService } from 'src/app/services/casa-farmaceutica.service';
import { FarmacoServiceService } from 'src/app/services/farmaco.service.service';
import { CasaFarmaceutica } from 'src/app/interfaces/casa-farmaceutica.interface';

@Component({
  selector: 'app-form-modal-farmaco',
  templateUrl: './form-modal-farmaco.component.html'
})

export class FormModalFarmacoComponent implements OnInit {
  insertar:boolean = true; 

  private casasFarmaceuticas : CasaFarmaceutica[] = [];

  farmaco: farmaco = {
    id: "", 
    nombre: "",
    casa: '',
    efectosAdversos: [],
    efectosAdversosNoReportados: [],
    observaciones: ""
  }; 

  constructor(
    public modalRef: BsModalRef,
    private srvFarmaco: FarmacoServiceService, 
    private srvCasaFarmaceutica: CasaFarmaceuticaService) {
    this.insertar = true; 
  } 

  ngOnInit(): void {
    this.getCasasFarmaceuticas();
  }
  
  titulo = (this.insertar == true ? "Agregar": "Actualizar") + " Farmaco";

  guardar(){
    console.log(this.farmaco);
  }

  getCasasFarmaceuticas(){
    this.srvCasaFarmaceutica.getCasasFarmaceuticas().subscribe((result)=>{
      this.casasFarmaceuticas = result;
      console.log(this.casasFarmaceuticas);
    })
  }

  getFarmaco(id:string){
    this.srvFarmaco.getFarmaco(id).subscribe((result)=>{
      this.farmaco = result; 
    })
  }

  addFarmaco(){
    this.srvFarmaco.addFarmacos(this.farmaco).subscribe((result)=>{
      console.log("guardado")
    });
  }

  updateFarmaco(){
    this.srvFarmaco.addFarmacos(this.farmaco).subscribe((result)=>{
      console.log("guardado")
    });
  }
}
