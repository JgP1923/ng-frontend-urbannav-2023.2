import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../modelos/usuario.model';
import {MD5} from 'crypto-js';


@Component({
  selector: 'app-identificacion-usuario',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioSeguridad : SeguridadService,
    private router: Router
   ){}
  
   ngOnInit() {
    this.ConstruirFormulario();
  }
  
  ConstruirFormulario() {
    this.fGroup= this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required,]]
    });
  }
   
   IdentificarUsuario(){
    if(this.fGroup.invalid){
      alert("Datos incompletos")
    }else{
      let usuario = this.obtenerFormGroup['usuario'].value;
      let clave = this.obtenerFormGroup['clave'].value;
      let claveCifrada = MD5(clave).toString();
      this.servicioSeguridad.IdentificadorUsuario(usuario, claveCifrada).subscribe({
        next: (datos: UsuarioModel) => {
          console.log(datos);
          if(this.servicioSeguridad.AlmacenarDatosUsuarioValidado(datos)){
          this.router.navigate(["/seguridad/2fa"])
          }
        },
        error: (error) => {
          console.log(error);
        }
        
      });
    }
   }
  
   get obtenerFormGroup(){
     return this.fGroup.controls;
   }
  }
  
  
  
