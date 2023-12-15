import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-identificacion-twofa',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './identificacion-twofa.component.html',
  styleUrl: './identificacion-twofa.component.css'
})
export class IdentificacionTwofaComponent {
  userId: string = "";
  fGroup: FormGroup = new FormGroup({});
  
  constructor(private servicioSeguridad : SeguridadService,private fb: FormBuilder,){}

  ngOnInit() {
    let datos = this.servicioSeguridad.ObtenerDatosUsuarioLs();
    if(datos != null){
      this.userId = datos.id!;
      this.ConstruirFormulario();
    }
  }

  ConstruirFormulario() {
    this.fGroup= this.fb.group({
      codigo:["",[Validators.required]]
    });
  }

  ValidarCodigo2fa(){
    if(this.fGroup.invalid){
      alert("Debe ingresar el código")
    }else{
     let codigo2fa= this.ObtenerFormGroup["codigo"].value;
     this.servicioSeguridad.ValidarCodigo2fa(this.userId,codigo2fa).subscribe({
      next:(datos:object)=>{
        console.log(datos);
      },
      error(err){
        console.log(err);
      }

     });
    }

  }

  get ObtenerFormGroup(){
    return this.fGroup.controls;
  }
   
}


