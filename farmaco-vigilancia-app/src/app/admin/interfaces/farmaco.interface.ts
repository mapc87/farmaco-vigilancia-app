import { KarchLassagna } from "src/app/patients/interfaces/karchLassagna";

export interface farmaco{
    _id?: any,
    nombre: string, 
    casa: string,
    efectosAdversos: string[],
    efectosAdversosNoReportados: string[];
    observaciones: string, 
    estado: boolean,
    seleccionado?: boolean,
    lote?: string;
    evaluacionKarchaLassagna?: KarchLassagna;
}