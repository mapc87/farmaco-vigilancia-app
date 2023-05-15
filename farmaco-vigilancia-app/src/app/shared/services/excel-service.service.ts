import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor() { }

  public exportToExcel (element: any, fileName: string): void{
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
    const workbooK: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbooK, ws, 'Pacientes');
    XLSX.writeFile(workbooK, fileName+EXCEL_EXTENSION)
  }
}
