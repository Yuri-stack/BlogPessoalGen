import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tema } from './../model/Tema';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTheme(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://backendblogpessoal.herokuapp.com/tema', this.token)
  }

  getByIdTheme(id: number): Observable<Tema>{
    return this.http.get<Tema>(`https://backendblogpessoal.herokuapp.com/tema/${id}`, this.token)
  }

  postTheme(theme: Tema): Observable<Tema>{
    return this.http.post<Tema>('https://backendblogpessoal.herokuapp.com/tema', theme, this.token)
  }

  putTheme(theme: Tema): Observable<Tema>{
    return this.http.put<Tema>('https://backendblogpessoal.herokuapp.com/tema', theme, this.token)
  }

  deleteTheme(id: number){
    return this.http.delete(`https://backendblogpessoal.herokuapp.com/tema/${id}`, this.token)
  }
}
