import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FmQuickReceiptPage } from './fm-quick-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: FmQuickReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FmQuickReceiptPageRoutingModule {}
