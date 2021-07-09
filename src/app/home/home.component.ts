import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { PostService } from '../service/post.service';
import { ThemeService } from '../service/theme.service';
import { AuthService } from '../service/auth.service';
import { AlertsService } from '../service/alerts.service';

import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: Postagem = new Postagem()
  listPost: Postagem[]
  titlePost: string
  
  theme: Tema = new Tema()
  listTheme: Tema[]
  idTheme: number
  titleTheme: string

  user: User = new User()
  idUser = environment.id

  key = 'data'  //  indicando que vamos ordernar pela Data
  reverse = true

  constructor(
    private router: Router,
    private postService: PostService,
    private themeService: ThemeService,
    private authService: AuthService,
    private alerts: AlertsService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.alerts.showAlertInfo("Your session has expired, please login")
      this.router.navigate(['/entrar'])
    }

    this.getAllThemes()
    this.getAllPost()
  }

  getAllThemes(){
    this.themeService.getAllTheme().subscribe((resp: Tema[]) => {
      this.listTheme = resp
    })
  }

  findByIdTheme(){
    this.themeService.getByIdTheme(this.idTheme).subscribe((resp: Tema) => {
      this.theme = resp
    })
  }

  getAllPost(){
    this.postService.getAllPost().subscribe((resp: Postagem[]) => {
      this.listPost = resp
    })
  }

  // findByTituloPostagem()
  findByTitlePost(){
    if(this.titlePost == ''){
      this.getAllPost()
    }else{
      this.postService.getByTitlePost(this.titlePost).subscribe((resp: Postagem[]) => {
        this.listPost = resp
      })
    }
  }

  // findByNomeTema()
  findByTheme(){
    if(this.titleTheme == ''){
      this.getAllThemes()
    }else{
      this.themeService.getByTheme(this.titleTheme).subscribe((resp: Tema[]) => {
        this.listTheme = resp
      })
    }
  }
    
  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  // publicar()
  publish(){
    this.theme.id = this.idTheme
    this.post.tema = this.theme

    this.user.id = this.idUser
    this.post.usuario = this.user

    this.postService.createPost(this.post).subscribe((resp: Postagem) => {
      this.post = resp

      this.alerts.showAlertSuccess('Post successfully')

      this.post = new Postagem()
      this.getAllPost()
    })

  }

}
