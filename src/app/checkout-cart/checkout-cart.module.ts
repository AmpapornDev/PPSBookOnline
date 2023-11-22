import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutCartPageRoutingModule } from './checkout-cart-routing.module';

import { CheckoutCartPage } from './checkout-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutCartPageRoutingModule
  ],
  declarations: [CheckoutCartPage]
})
export class CheckoutCartPageModule {}
