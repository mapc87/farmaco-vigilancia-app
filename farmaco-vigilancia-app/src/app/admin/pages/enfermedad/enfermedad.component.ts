import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { PageEvent } from '@angular/material/paginator';
import { enfermedad } from '../../interfaces/enfermedad.interface';
import { EnfermedadServiceService } from '../../services/enfermedad.service.service';


@Component({
  selector: 'app-enfermedad',
  templateUrl: './enfermedad.component.html'
})
export class EnfermedadComponent implements OnInit{
  modalRef?: BsModalRef;
  enfermedades: any[] = [];  
  enfermedad: enfermedad = {
    id: '', 
    nombre: '',
    observaciones: ''
  }; 

  pageSize = 10;
  desde: number = 0; 
  hasta: number = 10;

  constructor (private modalService: BsModalService, private srvEnfermedad: EnfermedadServiceService){   
  }

  ngOnInit(): void {    
    this.getEnfermedades();
  }

  abrirEnfermedadModal(){
    // const initialState: ModalOptions = {
    //   initialState: {
    //     list: [
    //       'open modal '
    //     ],
    //     title: 'Enfermedad Modal'
    //   }      
    // };
    // this.modalRef = this.modalService.show(ModalFormEnfermedadComponent, initialState);
    // this.modalRef.content.closeBtnName='Close';
  }

  getEnfermedadById(id:string){
    this.srvEnfermedad.getEnfermedad(id).subscribe((result)=> { this.enfermedad = result})
    console.log(this.enfermedad);
  }

  getEnfermedades(){
    this.srvEnfermedad.getEnfermedades().subscribe((result:any[]) =>{
      this.enfermedades = result;  
    });
  }  

  guardar(){
    this.srvEnfermedad.addEnfermedad(this.enfermedad).subscribe();
  }

  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }
}
