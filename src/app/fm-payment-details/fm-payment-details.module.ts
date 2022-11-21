import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmPaymentDetailsPageRoutingModule } from './fm-payment-details-routing.module';

import { FmPaymentDetailsPage } from './fm-payment-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmPaymentDetailsPageRoutingModule
  ],
  declarations: [FmPaymentDetailsPage]
})
export class FmPaymentDetailsPageModule {}
