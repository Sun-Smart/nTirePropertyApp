import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmAdditionalPagePageRoutingModule } from './fm-additional-page-routing.module';

import { FmAdditionalPagePage } from './fm-additional-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmAdditionalPagePageRoutingModule
  ],
  declarations: [FmAdditionalPagePage]
})
export class FmAdditionalPagePageModule {}
