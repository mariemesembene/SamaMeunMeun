import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPublicationsComponent } from './list-publications/list-publications.component';
import { ProfilComponent } from './profil/profil.component';
import { HelpComponent } from './help/help.component';
import { RouterModule } from '@angular/router';
import { EquipeComponent } from './equipe/equipe.component';



@NgModule({
  declarations: [ListPublicationsComponent, ProfilComponent, HelpComponent, EquipeComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ListPublicationsComponent,
    ProfilComponent,
    HelpComponent,
  ]
})
export class SharedModule { }
