import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  URL = "http://localhost:8085/api/categoria"

  constructor(private httpClient: HttpClient) { }

  public categoriaNueva(categoria: Categoria): Observable<any>{
    return this.httpClient.post<any>(this.URL + "/nuevo", categoria);
   }

   public listaCategorias(): Observable<any>{
    return this.httpClient.get<any>(this.URL + "/listaCategoria");
   }

   public categoriaByNombre(nombreCategoria: string): Observable<any>{
     return this.httpClient.post<any>(this.URL + "/categoriaByNombre", nombreCategoria);
   }
}
