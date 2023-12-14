import { Routes } from '@angular/router';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';
import { HomeComponent } from './publico/home/home.component';
import { EmpresaComponent } from './publico/empresa/empresa.component';

export const routes: Routes = [
    {
        path:"home",
        component: HomeComponent,
    },
    {
        path:"empresa",
        component: EmpresaComponent
    },
    {
        path: "seguridad",
        loadChildren: () => import('./modulo/seguridad/seguridad.module').then(modulo => modulo.SeguridadModule)
    },
    {
        path:"",
        pathMatch: "full",
        redirectTo: "/home"
    },
    {
        path:"**",
        component: RutaNoEncontradaComponent
    }
];
