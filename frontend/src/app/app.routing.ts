import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';


const routes: Routes =[
  {
    path: '',
    redirectTo: 'aboutUs',
    pathMatch: 'full',
  }, {
    path: '',
    component: HomeLayoutComponent,
    children: [{
      path: '',
      loadChildren: './home-layout/home-layout.module#HomeLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
