import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryCartPageRoutingModule } from './history-cart-routing.module';

import { HistoryCartPage } from './history-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryCartPageRoutingModule
  ],
  declarations: [HistoryCartPage]
})
export class HistoryCartPageModule {}
