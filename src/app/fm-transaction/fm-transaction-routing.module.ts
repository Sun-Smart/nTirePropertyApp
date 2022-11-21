import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FmTransactionPage } from './fm-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: FmTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FmTransactionPageRoutingModule {}
