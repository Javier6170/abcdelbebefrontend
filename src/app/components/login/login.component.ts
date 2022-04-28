import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLogginFail = true;
  loginUsuario: LoginUsuario = new LoginUsuario();
  roles: string[] = []

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
      this.router.navigate(['home']);
    }
  }

  onLogin() {
    this.authService.login(this.loginUsuario).subscribe(
      res => {
        this.isLogged = true
        this.isLogginFail = false
        this.tokenService.setToken(res.token);
        this.tokenService.setCorreo(res.correo);
        this.tokenService.setAthorities(res.authorities);
        this.roles = res.authorities;
        window.location.reload();
      }, er => {
        this.isLogged = false
        this.isLogginFail = true
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Has ingresado mal los campos!'
        })
      }
    );
  }

  olvideContrasena(){
    this.router.navigate(['olvideContrasena']);
  }

}
