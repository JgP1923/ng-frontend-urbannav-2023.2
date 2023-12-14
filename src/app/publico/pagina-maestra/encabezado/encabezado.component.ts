import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLateralComponent } from "../menu-lateral/menu-lateral.component";

@Component({
    selector: 'app-encabezado',
    standalone: true,
    templateUrl: './encabezado.component.html',
    styleUrl: './encabezado.component.css',
    imports: [RouterModule, MenuLateralComponent]
})
export class EncabezadoComponent {

}
