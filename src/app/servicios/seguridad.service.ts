import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutaBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService  {
  urlBase:string = ConfiguracionRutaBackend.urlSeguridad
  constructor(private http:HttpClient) { }

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
  AlmacenarDatosUsuarioValidado(datos:UsuarioModel){
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
  ValidarCodigo2fa(idUsuario:string , codigo:string):Observable<Object>{
    return this.http.post<Object>(`${this.urlBase}verificar-2fa`,{
      userId:idUsuario,
      codigo2fa: codigo    
    });
  }
}