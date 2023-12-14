import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-clave',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.css'
})
export class RecuperarClaveComponent {

  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
  ) { 
  }

  ngOnInit(){
    this.fb.group({
      usuario: ['',[Validators.required, Validators.email]],
    });
  }

  RecuperarClave(){
    if(this.fGroup.invalid){
      alert("Debe ingresar los datos del usuario")
    }else{
      alert("Enviando correo....")
    }
  }

  get obtenerFormGroup(){
    return this.fGroup.controls;
  }
}
