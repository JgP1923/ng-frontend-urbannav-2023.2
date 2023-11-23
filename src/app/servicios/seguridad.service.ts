import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase = ConfiguracionRutasBackend.urlSeguridad;
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Identifica un usuario en el sistema
   * @param usuario
   * @param clave
   * @returns los datos del usuario validado
   */
  IdentificarUsuario(usuario: string, clave: string): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.urlBase}identificar-usuario`,{
      correo: usuario,
      clave: clave
    });
  }

  /**
   * Almacena los datos del usuario
   * @param datos datos de usuario
   */
  AlmacenarDatosUsuarioIdentificado(datos: UsuarioModel): boolean{
    let cadena = JSON.stringify(datos);
    let datosLS = localStorage.getItem("datos-usuario");
    if(datosLS){
      return false;
    } else {
      localStorage.setItem("datos-usuario", cadena);
      return true;
    }
  }

  /**
   * Busca los datos de localstorage de un usuario
   * @returns 
   */
  ObtenerDatosUsuarioLS(): UsuarioModel | null{
    let datosLS = localStorage.getItem("datos-usuario");
    if(datosLS){
      let datos = JSON.parse(datosLS);
      return datos;
    }else{
      return null;
    }
  }

  /**
   * Validar 2fa
   * @param idUsuario 
   * @param codigo 
   * @returns 
   */
  ValidarCodigo2FA(idUsuario: string, codigo: string): Observable<object>{
    return this.http.post<object>(`${this.urlBase}verificar-2fa`,{
      userId: idUsuario,
      codigo2fa: codigo
    });
  }


}
