import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
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
      alert("Senhas incorretas")
    }else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        alert("Usuário Cadastrado com Sucesso")
      })
    }
  }

}
