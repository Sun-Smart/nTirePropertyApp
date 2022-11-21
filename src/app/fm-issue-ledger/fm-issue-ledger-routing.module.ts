import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FmIssueLedgerPage } from './fm-issue-ledger.page';

const routes: Routes = [
  {
    path: '',
    component: FmIssueLedgerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FmIssueLedgerPageRoutingModule {}
