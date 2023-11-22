import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailhistoryCartPageRoutingModule } from './detailhistory-cart-routing.module';

import { DetailhistoryCartPage } from './detailhistory-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailhistoryCartPageRoutingModule
  ],
  declarations: [DetailhistoryCartPage]
})
export class DetailhistoryCartPageModule {}
