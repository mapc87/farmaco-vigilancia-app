import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UsuarioServiceService } from '../../services/usuario.service.service';
import { PageEvent } from '@angular/material/paginator';
import { usuario } from '../../interfaces/usuario.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit{

  modalRef?: BsModalRef;

  @ViewChild('formularioUsuario') form: any; 
  
  usuarios: usuario[] = [];

  usuario: usuario = {
    nombre: '',
    usuario: '',
    password: '',
    rol: '',
    estado: false
  };

  pageSize = 10;
  desde: number = 0; 
  hasta: number = 10;

  constructor (
    private srvUsuario: UsuarioServiceService,
    private modalService: BsModalService,
    private toastr: ToastrService){   
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this.srvUsuario.getUsuarios().subscribe(result => {
      this.usuarios = result; 
    })
  }

  cambiarpagina(e: PageEvent){
    this.desde = e.pageIndex * e.pageSize; 
    this.hasta = this.desde + e.pageSize;
  }

  Guardar(){
    if(this.usuario._id){
      this.updateUsuario();
    }else{
      this.addUsuario();
    }  
  }

  addUsuario(){
    this.usuario.estado = true;
    this.srvUsuario.addUsuario(this.usuario).subscribe(result => {
      this.form.reset();
      this.getUsuarios();
      this.toastr.success("Usuario guardado");
    });
  }

  updateUsuario(){
    this.srvUsuario.updateUsuario(this.usuario).subscribe(result => {
      this.form.reset();
      this.getUsuarios();
      this.toastr.success("Usuario Actualizado");
    });
  }

  openModal(template: TemplateRef<any>, usuario: usuario) {
    this.usuario = usuario;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {   
      this.usuario.estado = this.usuario.estado == true? false: true;
      this.Guardar();
      this.modalRef?.hide();   
      this.getUsuarios();     
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

  actualizarUsuario(usuario: usuario){
    this.usuario = usuario; 
  }
}
