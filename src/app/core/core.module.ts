import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClickOutsideModule } from 'ng-click-outside';



@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    ClickOutsideModule
  ],
  exports: [
    HeaderComponent, FooterComponent, ClickOutsideModule
    ]
})
export class CoreModule { }
