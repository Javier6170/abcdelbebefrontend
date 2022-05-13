import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';
import { ProductoDto } from '../model/producto-dto';

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

   public update(id: number, productoDto: ProductoDto): Observable<any> {
    return this.httpClient.put<any>(this.URL + `/update/${id}`, productoDto);
  }

   public eliminarPtoducto(): Observable<any>{
     return this.httpClient.delete<any>(this.URL);
   }

   public detail(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.URL + `/detail/${id}`);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + `/delete/${id}`);
  }
   
}
