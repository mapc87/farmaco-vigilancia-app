import { farmaco } from '../../admin/interfaces/farmaco.interface';
import { datosClinicos } from './datos-clinicos';
export interface paciente{
    _id?:any;
    nombre: string;
    noRegistro: string;
    dpi: string;
    sexo: string;
    etnia: string;
    deptoNacimiento: string;
    deptoResidencia:string;
    municipioNacimiento:string;
    municipioResidencia:string;
    direccion: string;
    telefono: string;
    nombreEncargado:string; 
    telefonoEncargado: string; 
    fechaIngreso: Date;
    datosClinicos : datosClinicos [];
    estado: boolean;
    observaciones: string;    
}