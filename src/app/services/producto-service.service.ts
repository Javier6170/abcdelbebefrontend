import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  URL = "http://localhost:8085/api/productos"

  constructor(private httpClient: HttpClient) { }

  public productoNuevo(producto: Producto, ): Observable<any>{
    return this.httpClient.post<any>(this.URL + "/nuevo", producto);
   }

   public listaProductos(): Observable<any>{
    return this.httpClient.get<any>(this.URL);
   }

   
}
