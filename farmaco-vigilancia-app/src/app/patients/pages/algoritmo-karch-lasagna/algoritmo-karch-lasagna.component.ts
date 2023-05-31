import { Component, OnInit} from '@angular/core';
import { agoritmoKarchLassagna } from 'src/app/constantes';
import { Categoria, Item, KarchLassagna } from '../../interfaces/karchLassagna';
import { ToastrService } from 'ngx-toastr';
import { paciente } from '../../interfaces/paciente';
import { PacienteServiceService } from '../../services/paciente.service.service';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-algoritmo-karch-lasagna',
  templateUrl: './algoritmo-karch-lasagna.component.html'
})
export class AlgoritmoKarchLasagnaComponent implements OnInit {

  
  list: any[] = [];  
  total:number = 0;
  algoritmoValido: boolean = false; 

  karchLassagna: KarchLassagna = {
    items: [],
    total: 0,
    analisis: ""
  };

  paciente: paciente = {
    nombre: '',
    noRegistro: '',
    dpi: '',
    sexo: '',
    etnia: '',
    deptoNacimiento: '',
    deptoResidencia: '',
    municipioNacimiento: '',
    municipioResidencia: '',
    direccion: '',
    telefono: '',
    nombreEncargado: '',
    telefonoEncargado: '',
    fechaIngreso: new Date,
    fechaNacimiento: new Date,
    datosClinicos: [],
    estado: false,
    observaciones: ''
  }

  constructor(
      private srvPaciente: PacienteServiceService,
      private toastr: ToastrService,
      public modalRef: BsModalRef){   
  }

  ngOnInit(): void {
    this.karchLassagna = agoritmoKarchLassagna; 
    this.paciente = this.list[0]; 
    this.cargarAlgoritmoAsociado();
  }  

  agregarPuntuacion(item: Item, categoria: Categoria, event: any){
    item.categorias?.forEach(c => c.seleccionada = false);
    categoria.seleccionada = true;   
    item.puntuacion = categoria.puntuacion; 
    item.categoriaSeleccionada = categoria.nombre;   
    this.validarAlgoritmo();
    this.calcularTotal();    
  }

  calcularTotal(){
    this.karchLassagna.total = 0;
    this.karchLassagna.items.forEach(itemk => {
      this.karchLassagna.total += itemk.puntuacion;        
    });  
    this.calcularResultado();
  }

  calcularResultado(){
    switch(this.karchLassagna.total){
      case 0:
        this.karchLassagna.analisis = "IMPROBABLE";
        break; 
      case 1:
      case 2:
      case 3:
        this.karchLassagna.analisis = "CONDICIONAL";
        break; 
      case 4:
      case 5:
        this.karchLassagna.analisis = "POSIBLE";
        break; 
      case 6:
      case 7:   
        this.karchLassagna.analisis = "PROBABLE";
        break; 
      case 8: 
      this.karchLassagna.analisis = "DEFINIDA";
        break;  
      default:
        if(this.karchLassagna.total < 0){
          this.karchLassagna.analisis = "IMPROBABLE";
        }else{
          this.karchLassagna.analisis = "DEFINIDA";
        }       
        break;        
    }
  }

  Guardar(){
    if(this.algoritmoValido){    
      this.paciente.evaluacionKarchaLassagna = structuredClone(this.karchLassagna);
      this.paciente.evaluacionKarchaLassagna?.items.forEach(element => {
      delete element.categorias;          
    });

    this.srvPaciente.updatePaciente(this.paciente).subscribe(result=>{
      if(result){
        this.toastr.success("Algoritmo Karch & Lassagna asociado al paciente");
        this.limpiarAlgoritmo();
      } 
    });
    }else{
      this.toastr.error("Es necesario seleccionar una categoría por cada sección del algoritmo Karch & Lassagna");
    }
  }

  limpiarAlgoritmo(){
    this.algoritmoValido = false; 
    this.karchLassagna.total = 0; 
    this.karchLassagna.analisis = "";
    this.karchLassagna.items.forEach(i =>{
      i.categoriaSeleccionada = "";
      i.puntuacion = 0;
      i.categorias?.forEach(c => {
        c.seleccionada = false;
      })
    })
  }  

  validarAlgoritmo()
  {  
    this.algoritmoValido = true; 
    this.karchLassagna.items.forEach(i => {
      if(this.algoritmoValido){
        if(!i.categoriaSeleccionada?.length){
          this.algoritmoValido = false;       
        }
      }      
    });
  }

  cargarAlgoritmoAnterior(){    
    this.karchLassagna.analisis = this.paciente.evaluacionKarchaLassagna?.analisis ?? "" 
    this.karchLassagna.total = this.paciente.evaluacionKarchaLassagna?.total ?? 0;

    const arrayReportado = this.paciente.evaluacionKarchaLassagna;      
    this.karchLassagna.items.forEach(k => {
      arrayReportado?.items.forEach(ar => {
        if(k.nombre == ar.nombre){
          k.puntuacion = ar.puntuacion;
          k.categoriaSeleccionada = ar.categoriaSeleccionada; 
          k.categorias?.forEach(c => {
            if(c.nombre == ar.categoriaSeleccionada)
            {
              c.seleccionada = true; 
            }
          })
        }
      })
    });
  }

  cargarAlgoritmoAsociado(){ 
      if(this.paciente.evaluacionKarchaLassagna ){
        this.toastr.info("Paciente ya cuenta con una Algoritmo Karch & Lassagna")
        this.cargarAlgoritmoAnterior()
      }else{
        this.limpiarAlgoritmo();
      }   
  }  
}
