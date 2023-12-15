import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioValidadoModel } from '../../../modelos/usuario.validado.model';

@Component({
  selector: 'app-identificacion-twofa',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './identificacion-twofa.component.html',
  styleUrl: './identificacion-twofa.component.css'
})
export class IdentificacionTwofaComponent {
  userId: string = "";
  fGroup: FormGroup = new FormGroup({});
  
  constructor(private servicioSeguridad : SeguridadService,private fb: FormBuilder,private router: Router){}

  ngOnInit() {
    let datos = this.servicioSeguridad.ObtenerDatosUsuarioLs();
    if(datos != null){
      this.userId = datos._id!;
      this.ConstruirFormulario();
    }else{
      this.router.navigate(['/seguridad/identificar-usuario'])
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
      next:(datos:UsuarioValidadoModel)=>{
        console.log(datos);
        this.servicioSeguridad.AlmacenarDatosUsuarioValidadoLs(datos);
        this.router.navigate([''])
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


