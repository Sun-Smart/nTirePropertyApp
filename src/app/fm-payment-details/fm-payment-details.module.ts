import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmPaymentDetailsPageRoutingModule } from './fm-payment-details-routing.module';

import { FmPaymentDetailsPage } from './fm-payment-details.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmPaymentDetailsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [FmPaymentDetailsPage],
  providers:[HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class FmPaymentDetailsPageModule {}
