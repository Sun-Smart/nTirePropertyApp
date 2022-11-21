import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FmPaymentDetailsPage } from './fm-payment-details.page';

const routes: Routes = [
  {
    path: '',
    component: FmPaymentDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FmPaymentDetailsPageRoutingModule {}
