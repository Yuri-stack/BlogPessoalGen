import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Postagem } from './../model/Postagem';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPost(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://backendblogpessoal.herokuapp.com/postagens', this.token)
  }

  getByIdPost(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`https://backendblogpessoal.herokuapp.com/postagens/${id}`, this.token)
  }

  getByTitlePost(title: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`https://backendblogpessoal.herokuapp.com/postagens/titulo/${title}`, this.token)
  }

  // postPostagem(postagem: Postagem)
  createPost(post: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('https://backendblogpessoal.herokuapp.com/postagens', post, this.token)
  }

  // putPostagem()
  updatePost(post: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>('https://backendblogpessoal.herokuapp.com/postagens', post, this.token)
  }

  // deletePostagem()
  deletePost(id: number){
    return this.http.delete<Postagem>(`https://backendblogpessoal.herokuapp.com/postagens/${id}`, this.token)
  }
}
