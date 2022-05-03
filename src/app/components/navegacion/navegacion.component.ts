import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  isLogged = false;
  isAdminLogged = false;
  isNotToggle = true;
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true
    }
    if (this.tokenService.getAuthorities().length >= 2) {
      this.isAdminLogged = true
    }

    console.log(document.getElementById("togSide")?.ariaExpanded)
    let bool = document.getElementById("togSide")?.ariaExpanded
  }

  logOut() {
    this.tokenService.logOut();
    this.router.navigate(['home'])
    window.location.reload();


  }

  Ontoggler() {
    let mytoggle = document.getElementById("navbarsExample03");
    let bool = document.getElementById("togSide")?.ariaExpanded
    if (!mytoggle?.classList.contains("show")) {
      //@ts-ignore
      document.getElementById("navbar")?.style.paddingBottom = "100px";
      //@ts-ignore
      document.getElementById("navbar")?.style.marginBottom = "200px";
      this.isNotToggle = false;
    }
  }

  OnTogglerOut() {
    let mytoggle = document.getElementById("navbarsExample03");
    mytoggle?.classList.remove("show")
    //@ts-ignore
    document.getElementById("navbar")?.style.paddingBottom = "0px";
    //@ts-ignore
    document.getElementById("navbar")?.style.marginBottom = "0px";
    this.isNotToggle = true;
  }

  
} 
