import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-info',
  templateUrl: './editar-info.component.html',
  styleUrls: ['./editar-info.component.css']
})
export class EditarInfoComponent implements OnInit {

  usuario: Usuario = new Usuario();

  isImagenSubida = false;

  constructor(private tokenService: TokenService,
    private router: Router,
    private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.tokenService.getAuthorities().length > 1) {
      this.router.navigate(['acceso_denegado'])
    }
    if (this.tokenService.getToken()) {
      //@ts-ignore
      this.usuario.correo = this.tokenService.getCorreo();
      this.authService.getUSer(this.usuario.correo).subscribe(res => {
        this.usuario.nombre = res.nombre;
        this.usuario.telefono = res.telefono;
      })
    }

  }

  subirImagen() {

  }

  //imagen

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  onFileChanged(event: Event) {
    //@ts-ignore
    this.nombreImagen = event.target.files[0].name;

    //@ts-ignore
    this.selectedFile = event.target.files[0];

    //@ts-ignore
    this.nombreImagen = event.target.files[0].name;
    //@ts-ignore
    const files = event.target.files[0];
    if (files) {
      const imgPreview = document.getElementById("img-preview");
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function(){
        //@ts-ignore
        imgPreview?.style.display = "block";
        //@ts-ignore
        imgPreview.innerHTML = '<img class="imgPrev" src="' + this.result + '" style="width: 300px; height:200px; border-radius: 200px; margin-top: 10px" />';
      })
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.httpClient.post('http://localhost:8085/api/imagenUsuario/upload', uploadImageData, { observe: 'response' })
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
      //@ts-ignore
      this.usuario.nombre_imagen = event.target.files[0].name;

      console.log(this.usuario.nombre_imagen);
      this.authService.editImageUser(this.usuario.correo, this.usuario.nombre_imagen).subscribe(res=>{
        console.log('Res', res)
      }, err =>{
        console.log('Er', err.error.mensage)
      })
      
    }


  }

}
