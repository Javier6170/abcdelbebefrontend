import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/model/producto';
import { Usuario } from 'src/app/model/usuario';
import { Venta } from 'src/app/model/venta';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { TokenService } from 'src/app/services/token.service';
import { VentaServiceService } from 'src/app/services/venta-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  producto: Producto;
  usuario: Usuario = new Usuario();
  fechaActual: Date = new Date();
  
  mes: number;
  
  venta: Venta = new Venta();
  direccionVenta: string;

  files: any = []
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  nombreImagen: string;

  isLogin = false
  cantidadProductos: any[] = []

  cantidadDisponible: number;

  constructor(private productoService: ProductoServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private httpClient: HttpClient, private authService: AuthService, private ventaService: VentaServiceService) { }

  ngOnInit(): void {
    if (this.tokenService.getAuthorities().length > 1) {
      this.isLogin = true
    }
    //@ts-ignore
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.detail(id).subscribe(
      res => {
        this.producto = res;
        this.agregarImagenes()
        this.cantidadDisponible = this.producto.cantidad;
      }
    )
    if (this.tokenService.getToken()) {
      //@ts-ignore
      this.usuario.correo = this.tokenService.getCorreo();
      this.authService.getUSer(this.usuario.correo).subscribe(res => {
        this.usuario.nombre = res.nombre;
        this.usuario.telefono = res.telefono;
      })
    }

    this.mes = this.fechaActual.getMonth();

   
  }
  

  agregarImagenes() {
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


  onSubmit(formTemplate: NgForm){
    if (formTemplate.invalid) {
      Object.values(formTemplate.controls ).forEach(control => {
        control.markAsTouched();
      })
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los campos!'
      })
      return 
    }
    Swal.fire({
      title: 'Estamos procesando tu peticion...!',
      timer: 36000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.venta.direccion = this.direccionVenta;
    this.venta.fechaCompra = this.fechaActual;
    this.venta.correoUsuario = this.usuario.correo;
    this.venta.id_producto = this.producto.id;
    this.venta.mes = this.mes;
    this.venta.estado = 'Procesando';
    this.ventaService.generarVenta(this.venta).subscribe(res => {
      console.log('Res', res)
      Swal.fire({
        icon:'success',
        title:'Muy bien...',
        text:'¡Se ha generado la venta correctamente \n'+res.mensaje
      });
      this.recargar();
    }, err =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.mensaje
      })
      this.recargar();
    });
  }

  recargar(){
    this.router.navigate(['productos'])
  }
}
