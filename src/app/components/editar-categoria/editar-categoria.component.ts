import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  categoria: Categoria;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    if (this.tokenService.getAuthorities().length < 2) {
      this.router.navigate(['acceso_denegado'])
    }
    //@ts-ignore
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id)
    this.categoriaService.detail(id).subscribe(
      res => {
        this.categoria = res;
      }
    )
  }

  onUpdate(){
    //@ts-ignore
    const id = this.activatedRoute.snapshot.params.id;
    this.categoriaService.update(id, this.categoria).subscribe(
      data =>{
        console.log('data',data)
        Swal.fire({
          icon: 'success',
          title: 'Muy bien...',
          text: 'Categoria actualizada correctamente!'
        });
        this.router.navigate(['vista_admin'])
      }
    )
  }
  volver(){
    this.router.navigate(['vista_admin'])
  }

}
