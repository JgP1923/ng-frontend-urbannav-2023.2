import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLateralComponent } from "../menu-lateral/menu-lateral.component";
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-encabezado',
    standalone: true,
    templateUrl: './encabezado.component.html',
    styleUrl: './encabezado.component.css',
    imports: [RouterModule, MenuLateralComponent,CommonModule]
})
export class EncabezadoComponent {

    constructor(private servicioSeguridad:SeguridadService){}
   sesionActiva: boolean = false;

   ngOnInit() {
     this.validarSesion();
   }

   validarSesion(){
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
        next: (datos: UsuarioValidadoModel) => {
            if (datos.token != "") {
              this.sesionActiva = true;
            } else {
              this.sesionActiva = false;
            }
          },
          error: (err: any) => {
            console.log(err);
          }
        });
   }

}
