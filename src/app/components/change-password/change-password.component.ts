import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordDTO } from 'src/app/model/change-password-dto';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  password: string;
  confirmPassword: string;
  tokenPassword: string;
  dto: ChangePasswordDTO;

  constructor(private emailPasswordService: ChangePasswordService,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
   
  }

  onChangePassword(){
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Las contraseñas no coinciden"
      });
      return;
    }
    //@ts-ignore
    this.tokenPassword = this.activateRoute.snapshot.params.tokenPassword;
    this.dto = new ChangePasswordDTO(this.password, this.confirmPassword,this.tokenPassword);
    this.emailPasswordService.changePassword(this.dto).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Buena noticia...',
          text: 'Hemos cambiado tu contraseña'
        });
        this.router.navigate(["home"]);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.mensaje
        });
      }
    );
  }
}
