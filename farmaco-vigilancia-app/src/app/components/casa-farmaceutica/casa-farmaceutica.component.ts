import { Component, OnInit } from '@angular/core';
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
  casasFarmaceuticas: CasaFarmaceutica[] = [];
  casaFarmaceutica: CasaFarmaceutica = {
    id: "", 
    nombre: "",
    observaciones: ""
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

  public guardarCasaFarmaceutica(){
    this.srvCasaFarmaceutica.addCasaFarmaceutica(this.casaFarmaceutica).subscribe();
  }

  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }
}
