import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions} from 'ngx-bootstrap/modal'; 
import { ModalFormCasaFarmaceuticaComponent } from '../modal-form-casa-farmaceutica/modal-form-casa-farmaceutica.component';
import { CasaFarmaceuticaService } from '../../services/casa-farmaceutica.service';
import { CasaFarmaceutica } from 'src/app/interfaces/casa-farmaceutica.interface';
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
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'open modal '
        ],
        title: 'Casa farmaceutica Modal'
      }      
    };
    this.modalRef = this.modalService.show(ModalFormCasaFarmaceuticaComponent, initialState);
    this.modalRef.content.closeBtnName='Close';
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
    }    
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
    if(this.casaFarmaceutica.hasOwnProperty("_id")){
      this.casaFarmaceutica.estado = false;
      // this.actualizarCasaFarmaceutica();
      console.log(this.casaFarmaceutica);
      this.modalRef?.hide();
    }    
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }
}
