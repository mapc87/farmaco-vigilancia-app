import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { agoritmoKarchLassagna } from 'src/app/constantes';
import { Categoria, Item, KarchLassagna } from '../../interfaces/karchLassagna';

@Component({
  selector: 'app-algoritmo-karch-lasagna',
  templateUrl: './algoritmo-karch-lasagna.component.html'
})
export class AlgoritmoKarchLasagnaComponent implements OnInit {

  karchLassagna: KarchLassagna = {
    items: [],
    total: 0,
    analisis: ""
  };

  total:number = 0;

  constructor(){   

  }

  ngOnInit(): void {
    this.karchLassagna = agoritmoKarchLassagna; 
    console.log(this.karchLassagna);
  }

  calcularAlgoritmo(){

  }

  agregarPuntuacion(item: Item, categoria: Categoria, event: any){
    item.categorias.forEach(c => c.seleccionada = false);
    categoria.seleccionada = true;   
    item.puntuacion = categoria.puntuacion; 
 
    this.calcularTotal();
  }

  calcularTotal(){
    this.karchLassagna.total = 0;
    this.karchLassagna.items.forEach(itemk => {
      this.karchLassagna.total += itemk.puntuacion;        
    });  
    this.calcularResultado()

    console.log(this.karchLassagna.total);
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
}
