import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerPropertyDetailsPageRoutingModule } from './customer-property-details-routing.module';

import { CustomerPropertyDetailsPage } from './customer-property-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPropertyDetailsPageRoutingModule
  ],
  declarations: [CustomerPropertyDetailsPage]
})
export class CustomerPropertyDetailsPageModule {}
