import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AlertsService } from 'src/app/service/alerts.service';
import { PostService } from 'src/app/service/post.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {

  post: Postagem = new Postagem()
  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private alerts: AlertsService
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if(environment.token == ''){
      this.alerts.showAlertInfo("Your session has expired, please login")
      this.router.navigate(['/entrar'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPost(this.idPost)
  }

  findByIdPost(id: number){
    this.postService.getByIdPost(id).subscribe((resp: Postagem) => {
      this.post = resp
    })
  }

  delete(){
    this.postService.deletePost(this.idPost).subscribe(() => {
      this.alerts.showAlertSuccess('Post deleted successfully')
      this.router.navigate(['/home'])
    })
  }

}
