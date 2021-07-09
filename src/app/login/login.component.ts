import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';

import { UserLogin } from './../model/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin

  constructor(
    private authService: AuthService,
    private router: Router,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
    window.scroll(0,0) 
  }

  login(){
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) =>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id

      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.id)

      this.router.navigate(['/home'])
    }, erro => {
      this.alerts.showAlertDanger('Incorrect username or passwords')
    })
  }

}
