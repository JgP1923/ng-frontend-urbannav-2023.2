import { Routes } from '@angular/router';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';
import { HomeComponent } from './publico/home/home.component';

export const routes: Routes = [
    {
        path:"home",
        component: HomeComponent,
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
