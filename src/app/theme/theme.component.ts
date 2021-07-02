import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { Tema } from '../model/Tema';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  theme: Tema = new Tema()
  listThemes: Tema[]

  constructor(
    private router: Router,
    private themeService: ThemeService
    ) { }

  ngOnInit(){
    if(environment.token == ''){
      // alert("Sua sessão expirou, faça seu login")
      this.router.navigate(['/entrar'])
    }

    this.findAll()
  }

  findAll(){
    this.themeService.getAllTheme().subscribe((resp: Tema[]) => {
      this.listThemes = resp
    })
  }

  register(){
    this.themeService.postTheme(this.theme).subscribe((resp: Tema) => {
      this.theme = resp
      alert('Theme successfully registered!')

      this.findAll()
      this.theme = new Tema()
    })
  }

}
