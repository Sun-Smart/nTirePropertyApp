import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmIssueLedgerPageRoutingModule } from './fm-issue-ledger-routing.module';

import { FmIssueLedgerPage } from './fm-issue-ledger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmIssueLedgerPageRoutingModule
  ],
  declarations: [FmIssueLedgerPage]
})
export class FmIssueLedgerPageModule {}
