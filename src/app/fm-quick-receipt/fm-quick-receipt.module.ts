import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmQuickReceiptPageRoutingModule } from './fm-quick-receipt-routing.module';

import { FmQuickReceiptPage } from './fm-quick-receipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmQuickReceiptPageRoutingModule
  ],
  declarations: [FmQuickReceiptPage]
})
export class FmQuickReceiptPageModule {}
