import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmIssueLedgerPageRoutingModule } from './fm-issue-ledger-routing.module';

import { FmIssueLedgerPage } from './fm-issue-ledger.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmIssueLedgerPageRoutingModule,
    HttpClientModule
  ],
  declarations: [FmIssueLedgerPage],
  providers:[HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class FmIssueLedgerPageModule {}
