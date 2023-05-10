import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions} from 'ngx-bootstrap/modal'; 
import { CasaFarmaceuticaService } from '../../services/casa-farmaceutica.service';
import { CasaFarmaceutica } from 'src/app/admin/interfaces/casa-farmaceutica.interface';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';


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

  @ViewChild('casaFarmaceuticaForm') form: any;

  constructor (private modalService: BsModalService,
    private srvCasaFarmaceutica: CasaFarmaceuticaService,
    private toastr: ToastrService){   
  }

  ngOnInit(): void {
    this.getCasasFarmaceuticas();
  }

  getCasasFarmaceuticas(){
    this.srvCasaFarmaceutica.getCasasFarmaceuticas().subscribe(result => {
      this.casasFarmaceuticas = result;
    })
  }

  public guardar(){ 
    if(this.form.valid){
      if(this.casaFarmaceutica._id){
        this.actualizarCasaFarmaceutica();  
      }else{
        this.guardarCasaFarmaceutica()
      }          
    }   
  }

  actualizar(casa: CasaFarmaceutica){
    this.casaFarmaceutica = casa;
  }

  private guardarCasaFarmaceutica(){     
      this.srvCasaFarmaceutica
        .addCasaFarmaceutica(this.casaFarmaceutica)
        .subscribe(result => { 
          this.toastr.success("Casa farmaceutica guardada");
          this.form.reset();
          this.getCasasFarmaceuticas();
        });     
  }
 
  private actualizarCasaFarmaceutica(){
    this.srvCasaFarmaceutica
      .updateCasaFarmaceutica(this.casaFarmaceutica)
      .subscribe(result => {
        this.toastr.success("Casa farmaceutica actualizada");
        this.form.reset();
        this.getCasasFarmaceuticas();
      });     
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
    this.modalRef?.hide();
  }

  limpiarModelo(){
    this.form.reset();
  }
}
