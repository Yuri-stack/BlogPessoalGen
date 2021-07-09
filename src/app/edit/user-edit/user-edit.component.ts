import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertsService } from 'src/app/service/alerts.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  password: string
  role: string      // tipo do usuario

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alerts: AlertsService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.alerts.showAlertInfo("Your session has expired, please login")
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)

  }

  confirmPassword(event: any){
    this.password = event.target.value
  }

  userType(event: any){
    this.role = event.target.value
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  update(){
    this.user.tipo = this.role

    if(this.user.senha != this.password){
      this.alerts.showAlertDanger("Incorrect passwords")
    }else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/home'])

        this.alerts.showAlertSuccess("User Updated Successfully, make your login again")

        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])
      })
    }
  }

}
