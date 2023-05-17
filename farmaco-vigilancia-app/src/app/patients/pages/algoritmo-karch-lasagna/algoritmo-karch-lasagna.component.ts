import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { agoritmoKarchLassagna } from 'src/app/constantes';
import { Categoria, Item, KarchLassagna } from '../../interfaces/karchLassagna';
import { FarmacoServiceService } from 'src/app/admin/services/farmaco.service.service';
import { farmaco } from 'src/app/admin/interfaces/farmaco.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-algoritmo-karch-lasagna',
  templateUrl: './algoritmo-karch-lasagna.component.html'
})
export class AlgoritmoKarchLasagnaComponent implements OnInit {

  idFarmaco:any = ""; 
  farmacos: farmaco[] = [];  
  total:number = 0;
  algoritmoValido: boolean = false; 

  karchLassagna: KarchLassagna = {
    items: [],
    total: 0,
    analisis: ""
  };

  farmaco: farmaco = {
    nombre: '',
    casa: '',
    efectosAdversos: [],
    efectosAdversosNoReportados: [],
    observaciones: '',
    estado: false
  }

  constructor(
      private srvFarmaco: FarmacoServiceService,
      private toastr: ToastrService){   
  }

  ngOnInit(): void {
    this.karchLassagna = agoritmoKarchLassagna; 
    this.getFarmacos();

  }

  getFarmacos(){
    this.srvFarmaco.getFarmacos.subscribe(result => {
      this.farmacos = [];
      result.forEach(r => {
        if(r.estado == true){
          this.farmacos.push(r);
        }
      })
    })
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
      this.farmaco.evaluacionKarchaLassagna = structuredClone(this.karchLassagna);
      this.farmaco.evaluacionKarchaLassagna?.items.forEach(element => {
      delete element.categorias;          
    });

    this.srvFarmaco.updateFarmacos(this.farmaco).subscribe(result=>{
      if(result){
        this.toastr.success("Algoritmo Karch & Lassagna asociado al fármaco");
        this.limpiarAlgoritmo();
        this.getFarmacos();
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
    this.karchLassagna.analisis = this.farmaco.evaluacionKarchaLassagna?.analisis ?? "" 
    this.karchLassagna.total = this.farmaco.evaluacionKarchaLassagna?.total ?? 0;

    const arrayReportado = this.farmaco.evaluacionKarchaLassagna;      
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

  cargarFarmaco(){
  
    if(this.idFarmaco == ""){
      this.limpiarAlgoritmo()
    }else{
      this.farmacos.forEach(f => {
        if(f._id == this.idFarmaco){
          this.farmaco = f; 
          if(this.farmaco.evaluacionKarchaLassagna ){
            this.toastr.info("Fármaco ya cuenta con un Algoritmo Karch & Lassagna")
            this.cargarAlgoritmoAnterior()
          }else{
            this.limpiarAlgoritmo();
          }    
        }
      });
    }
  }
}
