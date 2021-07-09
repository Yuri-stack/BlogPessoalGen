import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { Tema } from '../model/Tema';
import { AlertsService } from '../service/alerts.service';
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
    private themeService: ThemeService,
    private alerts: AlertsService
    ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.alerts.showAlertInfo("Your session has expired, please login")
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
      this.alerts.showAlertSuccess('Theme successfully registered!')

      this.findAll()
      this.theme = new Tema()
    })
  }

}
