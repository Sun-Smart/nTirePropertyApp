import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmTransactionPageRoutingModule } from './fm-transaction-routing.module';

import { FmTransactionPage } from './fm-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmTransactionPageRoutingModule
  ],
  declarations: [FmTransactionPage]
})
export class FmTransactionPageModule {}
