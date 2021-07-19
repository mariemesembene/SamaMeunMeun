import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPublicationsComponent } from './shared/list-publications/list-publications.component';
import { SharedRoutingModule } from './shared/shared-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), SharedRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
