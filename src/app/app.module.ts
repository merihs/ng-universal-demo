import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeView } from './home/home-view.component';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post.component';

import { PostService } from '../api/post.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TransferHttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeView, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './+lazy/lazy.module#LazyModule'}
    ])
  ],
  declarations: [ AppComponent, HomeView, PostsComponent, PostComponent ],
  exports: [ AppComponent ],
  providers: [ PostService ]
})
export class AppModule {}
