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
import { PublierComponent } from './publier/publier.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [ListPublicationsComponent, ProfilComponent, HelpComponent, EquipeComponent, LoginComponent, SignupComponent, PublierComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    NgxDropzoneModule,
    YouTubePlayerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListPublicationsComponent,
    ProfilComponent,
    HelpComponent    
  ]
})
export class SharedModule { }
