import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostService } from 'src/app/service/post.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  post: Postagem = new Postagem()

  theme: Tema = new Tema()
  listTheme: Tema[]
  idTheme: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private themeService: ThemeService
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPost(id)
    this.findAllThemes()
  }

  findByIdPost(id: number){
    this.postService.getByIdPost(id).subscribe((resp: Postagem) => {
      this.post = resp
    })
  }

  findByIdTheme(){
    this.themeService.getByIdTheme(this.idTheme).subscribe((resp: Tema) => {
      this.theme = resp
    })
  }

  findAllThemes(){
    this.themeService.getAllTheme().subscribe((resp: Tema[]) => {
      this.listTheme = resp
    })
  }

  update(){
    this.theme.id = this.idTheme
    this.post.tema = this.theme

    this.postService.updatePost(this.post).subscribe((resp: Postagem) => {
      this.post = resp
      alert('Post updated successfully')
      this.router.navigate(['/home'])
    })
  }

}
