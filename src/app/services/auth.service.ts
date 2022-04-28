import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { LoginUsuario } from '../model/login-usuario';
import { NuevoUsuario } from '../model/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = "http://localhost:8085/auth/"

  constructor(private httpClient: HttpClient) {}

   public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.httpClient.post<any>(this.authURL + "nuevo", nuevoUsuario);
   }
  
   public login(loginUsuario: LoginUsuario): Observable<any>{
    return this.httpClient.post<any>(this.authURL + "login", loginUsuario);
   }

   public recoverPassword(correo: string): Observable<any>{
     return this.httpClient.get<any>(this.authURL+ "recoverPassword/"+ correo);
   }

   public getUSer(correo: string): Observable<any>{
     return this.httpClient.get<any>(this.authURL + "user/" + correo);
   }

   public editImageUser(correo: string, nombre_imagen: string): Observable<any>{
    return this.httpClient.post<any>(this.authURL + "editarImagen/" + correo, nombre_imagen);
  }

}
