import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: NuevoUsuario = new NuevoUsuario();
  
  constructor(private authService: AuthService, 
    private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigate(['home']);
    }

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
    this.authService.nuevo(this.nuevoUsuario).subscribe(res => {
      console.log('Res', res)
      Swal.fire({
        icon:'success',
        title:'Muy bien...',
        text:'¡Has sido registrado correctamente! \n'+res.mensaje
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
    
    this.recargar();
  }

  recargar(){
    this.router.navigate(['recargar_registro'])
  }
}
