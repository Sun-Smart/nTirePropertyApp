import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmPropertyListPageRoutingModule } from './fm-property-list-routing.module';

import { FmPropertyListPage } from './fm-property-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmPropertyListPageRoutingModule
  ],
  declarations: [FmPropertyListPage]
})
export class FmPropertyListPageModule {}
