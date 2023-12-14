import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from "./publico/pagina-maestra/encabezado/encabezado.component";
import { PiePaginaComponent } from './publico/pagina-maestra/pie-pagina/pie-pagina.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, EncabezadoComponent,PiePaginaComponent]
})
export class AppComponent {
  title = 'UrbanNav';
}
