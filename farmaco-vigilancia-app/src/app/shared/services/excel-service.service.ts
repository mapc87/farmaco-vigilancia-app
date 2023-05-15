import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor() { }

  public exportToExcel (element: any, datosClinicos: any, farmacos: any, fileName: string): void{
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
    const dc: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosClinicos);
    const fp: XLSX.WorkSheet = XLSX.utils.json_to_sheet(farmacos);

    const workbooK: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbooK, ws, 'Pacientes');
    XLSX.utils.book_append_sheet(workbooK, dc, 'Datos clínicos Paciente');
    XLSX.utils.book_append_sheet(workbooK, fp, 'Farmacos por paciente');
    XLSX.writeFile(workbooK, `${fileName}${EXCEL_EXTENSION}`)
  }
}
