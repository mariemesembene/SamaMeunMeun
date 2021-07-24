import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPublicationsComponent } from './list-publications/list-publications.component';
import { ProfilComponent } from './profil/profil.component';
import { HelpComponent } from './help/help.component';
import { RouterModule } from '@angular/router';
import { EquipeComponent } from './equipe/equipe.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [ListPublicationsComponent, ProfilComponent, HelpComponent, EquipeComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    ListPublicationsComponent,
    ProfilComponent,
    HelpComponent,
    
  ]
})
export class SharedModule { }
