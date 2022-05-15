import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { Producto } from 'src/app/model/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent implements OnInit {

  isInicio = true
  isAnadirProducto = false;
  isAnadirCategoria = false;
  isListaProductos = false;
  isListaCategorias = false;
  isProductos = false;
  listProductos: Producto[];
  imagenPrevia: any;
  isImagenSubida = false;
  producto: Producto = new Producto();
  categoria: Categoria = new Categoria();
  nombreImagen: string

  nombreCategoria: string;

  listCategorias: Categoria[];
  seleccionado: string;

  constructor(private tokenService: TokenService,
    private router: Router,
    private productoService: ProductoServiceService,
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient) { }

  //imagen

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  //Gets called when the user selects an image

  public onFileChanged(event: Event) {
    //@ts-ignore
    console.log(event.target.files[0])
    //Select File
    //@ts-ignore
    this.selectedFile = event.target.files[0];

    //@ts-ignore
    this.nombreImagen = event.target.files[0].name;

    var nombre = document.getElementById("nombre_imagen");
    //@ts-ignore
    nombre.value = this.nombreImagen;
    this.producto.nombre_imagen = this.nombreImagen;
  }

  ngOnInit(): void {

    if (this.tokenService.getAuthorities().length < 2) {
      this.router.navigate(['acceso_denegado'])
    }
    this.productoService.listaProductos().subscribe(res => {
      this.listProductos = res;
    });
    this.categoriaService.listaCategorias().subscribe(resCat => {
      this.listCategorias = resCat;
    })
  }

  buscarCategoria() {
    this.categoriaService.categoriaByNombre(this.nombreCategoria).subscribe(res => {
      console.log(res)
    })
  }

  anadirProducto() {
    this.isInicio = false;
    this.isAnadirProducto = true;
  }
  anadirCategoria() {
    this.isInicio = false;
    this.isAnadirCategoria = true;
  }

  volver() {
    this.isProductos = true;
    this.isAnadirProducto = false;
    this.isAnadirCategoria = false;
    this.isListaCategorias = false;
    this.router.navigate(['vista_admin']);
    window.location.reload();
  }

  listaProductos() {
    this.isInicio = false
    this.isListaProductos = true
    this.isAnadirProducto = false
    this.isAnadirCategoria = false;
    this.isListaCategorias = false;
  }

  listCategories() {
    this.isInicio = false
    this.isListaProductos = false;
    this.isAnadirProducto = false
    this.isAnadirCategoria = false;
    this.isListaCategorias = true;
  }

  subirImagen() {
    console.log(this.selectedFile);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8085/api/imagen/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Se ha subido';
          this.isImagenSubida = true;
        } else {
          this.message = 'Se ha subido';
          this.isImagenSubida = true;
        }
      }
      );
    this.isImagenSubida = true;
    Swal.fire({
      icon: 'success',
      title: 'Muy bien...',
      text: '¡Imagen cargada ahora completa la informacion!'
    });

  }


  onRegistroProduct(formTemplate: NgForm) {
    if (formTemplate.invalid) {
      Object.values(formTemplate.controls).forEach(control => {
        control.markAsTouched();
      })
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los campos!'
      })
      return
    }

    if (this.seleccionado != null) {
      this.producto.nombreCategoria = this.seleccionado;
      this.productoService.productoNuevo(this.producto).subscribe(res => {
        console.log('Res', res)
      });
      Swal.fire({
        icon: 'success',
        title: 'Muy bien...',
        text: '¡Producto Registrado!'

      });
      this.router.navigate(['vista_admin']);
      window.location.reload();
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes escoger una categoria!'

      })
    }
  }



  onRegistrarCategoria(formTemplate: NgForm) {
    if (formTemplate.invalid) {
      Object.values(formTemplate.controls).forEach(control => {
        control.markAsTouched();
      })
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los campos!'
      })
      return
    }
    this.categoriaService.categoriaNueva(this.categoria).subscribe(res => {
      console.log('Cat res', res)
    })
    Swal.fire({
      icon: 'success',
      title: 'Muy bien...',
      text: '¡Categoria Registrada!'
    });
    this.router.navigate(['vista_admin']);
    window.location.reload();
  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Muy bien...',
          text: '¡producto borrado!'
        });
        this.router.navigate(['vista_admin']);
        window.location.reload();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:  err.error.mensaje
        })
      }
    );
  }

  borrarCategoria(id: number){
    this.categoriaService.delete(id).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Muy bien...',
          text: '¡categoria borrada!'
        });
        this.router.navigate(['vista_admin']);
        window.location.reload();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:  err.error.mensaje
        })
      }
    );
  }

  ingresosMensuales(){
    this.router.navigate(['ingresosMensuales'])
  }

  estadisticasVentas(){
    this.router.navigate(['estadisticasVentas'])
  }
}
