import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { CustomerSideNavBarPageModule } from "./customer-side-nav-bar/customer-side-nav-bar.module";
import {CustomerSideNavBarPage} from './customer-side-nav-bar/customer-side-nav-bar.page'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [AppComponent,CustomerSideNavBarPage],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
      FormsModule,ReactiveFormsModule
    ],
})
export class AppModule {}
