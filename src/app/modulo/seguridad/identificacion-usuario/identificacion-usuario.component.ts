import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-identificacion-usuario',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './identificacion-usuario.component.html',
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
  
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
      alert("identificando....")
    }
   }
  
   get obtenerFormGroup(){
     return this.fGroup.controls;
   }
  }
  
  
  
