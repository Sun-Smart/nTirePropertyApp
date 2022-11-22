import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerPropertyDetailsPageRoutingModule } from './customer-property-details-routing.module';

import { CustomerPropertyDetailsPage } from './customer-property-details.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPropertyDetailsPageRoutingModule,HttpClientModule
  ],
  declarations: [CustomerPropertyDetailsPage],
  schemas:[NO_ERRORS_SCHEMA]
})
export class CustomerPropertyDetailsPageModule {}
