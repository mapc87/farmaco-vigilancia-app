import { farmaco } from "src/app/admin/interfaces/farmaco.interface";

export interface datosClinicos {
    diagnostico: string;
    estadioEnfermedad: string;
    fechaIngresoUnidad: string; 
    quimioterapia: string; 
    cicloNo: string; 
    fecha:string; 
    farmacosUtilizados: farmaco[];
    estado: boolean,
    observaciones: string
}

