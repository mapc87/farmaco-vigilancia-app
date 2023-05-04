import { efectosAdversos } from './efectos-adversos.interface';

export interface farmaco{
    _id?: any,
    nombre: string, 
    casa: string,
    efectosAdversos: string[],
    efectosAdversosNoReportados: string[];
    observaciones: string, 
    estado: boolean
}