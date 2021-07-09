import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../service/alerts.service';

import { User } from './../model/User';
import { AuthService } from './../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User
  password: string
  role: string    // tipo do usuario

  constructor(
    private authService: AuthService,
    private router: Router,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
    window.scroll(0,0) 
  }

  confirmPassword(event: any){
    this.password = event.target.value
  }

  userType(event: any){
    this.role = event.target.value
  }

  register(){
    this.user.tipo = this.role

    if(this.user.senha != this.password){
      this.alerts.showAlertDanger("Senhas incorretas")
    }else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alerts.showAlertSuccess("Usuário Cadastrado com Sucesso")
      })
    }
  }

}
