import { CasaFarmaceutica } from "./casa-farmaceutica.interface";

export interface farmaco{
    id: string,
    nombre: string, 
    observaciones: string, 
    casa: CasaFarmaceutica
}