import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EnfermedadComponent } from "./pages/enfermedad/enfermedad.component";
import { FarmacoComponent } from "./pages/farmaco/farmaco.component";
import { CasaFarmaceuticaComponent } from "./pages/casa-farmaceutica/casa-farmaceutica.component";
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";
import { EfectosAdversosComponent } from "./pages/efectos-adversos/efectos-adversos.component";

const routes : Routes = [   
    {path: 'casas-farmaceuticas', component: CasaFarmaceuticaComponent},
    {path: 'efectos-adversos', component: EfectosAdversosComponent},
    {path: 'enfermedades', component: EnfermedadComponent},   
    {path: 'farmacos', component: FarmacoComponent},
    {path: 'usuarios',component:UsuariosComponent},
    {path: '***', redirectTo: 'pacientes'}
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class AdminRoutingModule{

}