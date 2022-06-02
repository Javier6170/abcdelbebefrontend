import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../model/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaServiceService {

  URL = "http://localhost:8085/api/ventas"

  constructor(private httpClient: HttpClient) { }

  generarVenta(venta: Venta): Observable<any>{
    return this.httpClient.post<any>(this.URL + "/nuevo", venta);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `/delete/${id}`);
  }

  public listaVentas(): Observable<any>{
    return this.httpClient.get<any>(this.URL);
   }
  
}
