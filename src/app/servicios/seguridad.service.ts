import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutaBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs/internal/Observable';
import { UsuarioValidadoModel } from '../modelos/usuario.validado.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService  {
  urlBase:string = ConfiguracionRutaBackend.urlSeguridad
  constructor(private http:HttpClient) {
    this.validacionDeSesion();
   }

  /**
   * identificación de usuario
   *  @param usuario 
   * @param clave
   * @returns datos del usuario
   */
  IdentificadorUsuario(usuario:string , clave:string):Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.urlBase}identificar-usuario`,{
      correo:usuario,
      clave:clave
    });
  }
  
  /**
   * Almacena los datos del usuario
   * @param datos  datos del usuario
   */
  AlmacenarDatosUsuarioValidado(datos:UsuarioModel):boolean{
   let cadena = JSON.stringify(datos);
   let datosLs = localStorage.getItem("datos-usuario");
   if(datosLs){
    return false;
   }else{
      localStorage.setItem("datos-usuario",cadena);
      return true;
   }
  }

  /**
   * Busca los datos en localstorage de un usuario
   * @returns  retorna los datos del usuario
   */
  ObtenerDatosUsuarioLs():UsuarioModel | null{
     let datosLs = localStorage.getItem("datos-usuario");
     if(datosLs){
        let datos = JSON.parse(datosLs);
        return datos;
     }else{
       return null;
     }
  }

 /**
  * 
  * @param idUsuario 
  * @param codigo 
  * @returns 
  */
  ValidarCodigo2fa(idUsuario:string , codigo:string):Observable<UsuarioValidadoModel>{
    return this.http.post<UsuarioValidadoModel>(`${this.urlBase}verificar-2fa`,{
      userId:idUsuario,
      codigo2fa: codigo    
    });
  }

/**
 * Guarda en localstroage los datos del usuario validado
 * @param datos datos del usuario guardado
 * @returns respuesta
 */
  AlmacenarDatosUsuarioValidadoLs(datos:UsuarioValidadoModel):boolean{
    let datosLs = localStorage.getItem("datos-sesion");
    if(datosLs != null){
      return false;
    }else{
      let datosString = JSON.stringify(datos);
      localStorage.setItem("datos-sesion",datosString);
      return true;
    }
  }

  datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel());

  ObtenerDatosSesion(): Observable<UsuarioValidadoModel> {
    return this.datosUsuarioValidado.asObservable();
  }

  validacionDeSesion(): UsuarioValidadoModel | null{
    let ls = localStorage.getItem("datos-sesion");
    if (ls) {
      let objUsuario = JSON.parse(ls);
      this.ActualizarComportamientoUsuario(objUsuario);
      return objUsuario;
    }
    return null
  }

  ActualizarComportamientoUsuario(datos: UsuarioValidadoModel) {
    return this.datosUsuarioValidado.next(datos);
  }


  
}