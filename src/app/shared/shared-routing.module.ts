import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EquipeComponent } from "./equipe/equipe.component";
import { HelpComponent } from "./help/help.component";
import { ListPublicationsComponent } from "./list-publications/list-publications.component";
import { ProfilComponent } from "./profil/profil.component";

const routes: Routes = [
    {
      path:'',
      redirectTo:'publications',
      pathMatch:'full'
    },
    {
      path:'publications',
      component:ListPublicationsComponent,
    },
    {
      path:'profil',
      component:ProfilComponent,
    },
    {
      path:'help',
      component:HelpComponent,
    },
    {
      path:'concept',
      component:EquipeComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class SharedRoutingModule{}