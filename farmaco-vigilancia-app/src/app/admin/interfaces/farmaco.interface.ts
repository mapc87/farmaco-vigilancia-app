import { CasaFarmaceutica } from "./casa-farmaceutica.interface";
import { efectosAdversos } from './efectos-adversos.interface';

export interface farmaco{
    id: string,
    nombre: string, 
    observaciones: string, 
    casa: string,
    efectosAdversos: efectosAdversos[],
    efectosAdversosNoReportados: efectosAdversos[];
    estado: boolean
}