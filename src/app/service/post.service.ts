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

  // postPostagem(postagem: Postagem)
  createPost(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('https://backendblogpessoal.herokuapp.com/postagens', postagem, this.token)
  }

}
