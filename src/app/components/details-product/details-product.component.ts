import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/model/producto';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  producto: Producto;

  files: any = []
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  nombreImagen: string;

  cantidadProductos: any[] = []


  constructor(private productoService: ProductoServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    //@ts-ignore
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id)
    this.productoService.detail(id).subscribe(
      res => {
        this.producto = res;
        this.agregarImagenes()
      }
    )
    
  }

  agregarImagenes(){
      this.httpClient.get('http://localhost:8085/api/imagen/get/' + this.producto.nombre_imagen)
        .subscribe(
          res => {
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            this.producto.retreieve_image = this.retrievedImage;
          }
        );
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
