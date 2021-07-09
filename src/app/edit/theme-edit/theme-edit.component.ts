import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertsService } from 'src/app/service/alerts.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit {

  theme: Tema = new Tema()
  idTheme: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private alerts: AlertsService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.alerts.showAlertInfo("Your session has expired, please login")
      this.router.navigate(['/entrar'])
    }

    this.idTheme = this.route.snapshot.params['id']
    this.findByIdTheme(this.idTheme)
  }

  findByIdTheme(id: number){
    this.themeService.getByIdTheme(id).subscribe((resp: Tema) => {
      this.theme = resp
    })
  }

  updateTheme(){
    this.themeService.putTheme(this.theme).subscribe((resp: Tema) => {
      this.theme = resp
      this.alerts.showAlertSuccess('Theme updated successfully ')
      this.router.navigate(['/tema'])
    })
  }

}
