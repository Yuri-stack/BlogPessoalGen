import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDeleteComponent } from './delete/post-delete/post-delete.component';

import { ThemeDeleteComponent } from './delete/theme-delete/theme-delete.component';
import { PostEditComponent } from './edit/post-edit/post-edit.component';
import { ThemeEditComponent } from './edit/theme-edit/theme-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ThemeComponent } from './theme/theme.component';


const routes: Routes = [

  {path: '', redirectTo: 'entrar', pathMatch: 'full'},

  {path: 'entrar', component: LoginComponent},
  {path: 'cadastrar', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'tema', component: ThemeComponent},

  {path: 'tema-edit/:id', component: ThemeEditComponent},
  {path: 'tema-delete/:id', component: ThemeDeleteComponent},

  {path: 'postagem-edit/:id', component: PostEditComponent},
  {path: 'postagem-delete/:id', component: PostDeleteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
