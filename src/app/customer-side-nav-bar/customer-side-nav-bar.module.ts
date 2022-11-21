import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerSideNavBarPageRoutingModule } from './customer-side-nav-bar-routing.module';

// import { CustomerSideNavBarPage } from './customer-side-nav-bar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerSideNavBarPageRoutingModule
  ],
  declarations: []
})
export class CustomerSideNavBarPageModule {}
