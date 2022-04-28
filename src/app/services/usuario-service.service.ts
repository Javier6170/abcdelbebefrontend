import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {


  constructor(private httpClient: HttpClient) { }

  // retorna los usuarios
  obtenerListaUsuarios(): Observable<any> {
    return this.httpClient.get<any>('api/usuarios');
  }

  registrarUsuario(usuario: Usuario): Observable<object> {
    return this.httpClient.post('api/usuarios', usuario);
  }
}
