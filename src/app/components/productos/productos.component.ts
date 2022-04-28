import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Producto } from 'src/app/model/producto';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  previsualizacion: string;
  listProductos: Producto[];
  files: any = []
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  nombreImagen: string
  producto: Producto;

  constructor(private sanitiezer: DomSanitizer
    , private tokenService: TokenService
    , private router: Router,
    private productoService: ProductoServiceService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.productoService.listaProductos().subscribe(res => {
      this.listProductos = this.agregarImagenes(res);
      console.log(this.listProductos)
    });
   
  }

  onChange(event: Event) {
    console.log(event);
  }

  agregarImagenes(productos: Producto[]){
    let listProducts: Producto[] = productos;
    for (let producto of listProducts) {
      this.httpClient.get('http://localhost:8085/api/imagen/get/' + producto.nombre_imagen)
        .subscribe(
          res => {
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            producto.retreieve_image = this.retrievedImage;
          }
        );
    }
    return listProducts;
  }

  getImage(nombreImagen: string) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8085/api/imagen/get/' + nombreImagen)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
    return this.retrievedImage;
  }

}
