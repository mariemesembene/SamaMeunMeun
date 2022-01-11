import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { SearchBarComponent } from './search-bar/search-bar.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, CommentItemComponent, SearchBarComponent],
  imports: [
    CommonModule,
    ClickOutsideModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent, FooterComponent, ClickOutsideModule, CommentItemComponent,
    SearchBarComponent
    ]
})
export class CoreModule { }
