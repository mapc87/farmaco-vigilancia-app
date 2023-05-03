import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions} from 'ngx-bootstrap/modal'; 
import { CasaFarmaceuticaService } from '../../services/casa-farmaceutica.service';
import { CasaFarmaceutica } from 'src/app/admin/interfaces/casa-farmaceutica.interface';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-casa-farmaceutica',
  templateUrl: './casa-farmaceutica.component.html'
})
export class CasaFarmaceuticaComponent implements OnInit{

  modalRef?: BsModalRef;
  message?: string;
  casasFarmaceuticas: CasaFarmaceutica[] = [];
  casaFarmaceutica: CasaFarmaceutica = {
    nombre: "",
    observaciones: "",
    estado: true,
  }; 

  pageSize = 10;
  desde: number = 0; 
  hasta: number = 10;

  constructor (private modalService: BsModalService,
    private srvCasaFarmaceutica: CasaFarmaceuticaService){   
  }

  ngOnInit(): void {
    this.getCasasFarmaceuticas();
  }

  abrirCasaFarmaceuticaModal(){
    // const initialState: ModalOptions = {
    //   initialState: {
    //     list: [
    //       'open modal '
    //     ],
    //     title: 'Casa farmaceutica Modal'
    //   }      
    // };
    // this.modalRef = this.modalService.show(ModalFormCasaFarmaceuticaComponent, initialState);
    // this.modalRef.content.closeBtnName='Close';
  }

  getCasasFarmaceuticas(){
    this.srvCasaFarmaceutica.getCasasFarmaceuticas().subscribe(result => {
      this.casasFarmaceuticas = result;
    })
  }

  public guardar(){  
    if(this.casaFarmaceutica.hasOwnProperty("_id")){
      this.actualizarCasaFarmaceutica();
    }else{
      this.guardarCasaFarmaceutica()
      console.log("guardar")
    }    
    this.LimpiarCasaFarmaceutica
  }

  actualizar(casa: CasaFarmaceutica){
    this.casaFarmaceutica = casa;
  }

  public guardarCasaFarmaceutica(){     
      this.srvCasaFarmaceutica.addCasaFarmaceutica(this.casaFarmaceutica).subscribe(result => console.log(result));     
  }
 
  actualizarCasaFarmaceutica(){
    this.srvCasaFarmaceutica.updateCasaFarmaceutica(this.casaFarmaceutica).subscribe(result => console.log(result));     
  }

  openModal(template: TemplateRef<any>, casa: CasaFarmaceutica) {
    this.casaFarmaceutica = casa;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  
  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }

  confirm(): void {
    this.casaFarmaceutica.estado = this.casaFarmaceutica.estado == true? false: true;
      this.guardar();
      this.modalRef?.hide();  
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  LimpiarCasaFarmaceutica(){
    this.casaFarmaceutica.nombre = '';
    this.casaFarmaceutica.estado = false;
    this.casaFarmaceutica.observaciones = "";
  }

}
