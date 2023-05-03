import { efectosAdversos } from './efectos-adversos.interface';

export interface farmaco{
    _id?: any,
    nombre: string, 
    casa: string,
    efectosAdversos: efectosAdversos[],
    efectosAdversosNoReportados: efectosAdversos[];
    observaciones: string, 
    estado: boolean
}