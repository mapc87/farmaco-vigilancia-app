import { efectosAdversos } from "./efectos-adversos.interface";

export interface farmaco{
    _id?: any,
    nombre: string, 
    casa: string,
    efectosAdversos: efectosAdversos[],
    observaciones: string, 
    estado: boolean,
    seleccionado?: boolean,
    lote?: string;
}