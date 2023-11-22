import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailhistoryCartPage } from './detailhistory-cart.page';

const routes: Routes = [
  {
    path: '',
    component: DetailhistoryCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailhistoryCartPageRoutingModule {}
