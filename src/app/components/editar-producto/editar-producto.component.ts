import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/model/producto';
import { ProductoDto } from 'src/app/model/producto-dto';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto: Producto;
  productoDto: ProductoDto;
  constructor(private productoService: ProductoServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getAuthorities().length < 2) {
      this.router.navigate(['acceso_denegado'])
    }
    //@ts-ignore
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id)
    this.productoService.detail(id).subscribe(
      res => {
        this.producto = res;
        this.productoDto = res
      }
    )
  }

  onUpdate(){
    //@ts-ignore
    const id = this.activatedRoute.snapshot.params.id;
    if (this.productoDto.cantidad == 0 || this.productoDto.cantidad < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes tener una cantidad de almenos un producto!'

      })
      return
    }
    if (this.productoDto.precio == 0 || this.productoDto.precio < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes poner una cantidad razonable en el precio!'

      })
      return
    }
    this.productoService.update(id, this.productoDto).subscribe(
      data =>{
        console.log('data',data)
        Swal.fire({
          icon: 'success',
          title: 'Muy bien...',
          text: '¡Producto actualizado correctamente!'
        });
        this.router.navigate(['vista_admin'])
      }
    )
  }

}
