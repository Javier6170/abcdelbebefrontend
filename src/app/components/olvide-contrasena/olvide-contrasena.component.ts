import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValuesDTO } from 'src/app/model/email-values-dto';
import { UserRocover } from 'src/app/model/user-recover';
import { AuthService } from 'src/app/services/auth.service';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-olvide-contrasena',
  templateUrl: './olvide-contrasena.component.html',
  styleUrls: ['./olvide-contrasena.component.css']
})
export class OlvideContrasenaComponent implements OnInit {

  mailTo: string;
  dto: EmailValuesDTO;

  constructor(private emailPasswordService: ChangePasswordService,
    private router: Router) { }

  ngOnInit(): void {
  }


  onOlvidePassword() {
    Swal.fire({
      title: 'Estamos procesando tu peticion...!',
      timer: 36000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.dto = new EmailValuesDTO(this.mailTo);
    this.emailPasswordService.sendEmail(this.dto).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Hemos enviado un correo..',
          text: 'Revisa tu correo'
        });
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.mensaje
        });
      }
    )
  }

}
