import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class SharedRoutingModule{}