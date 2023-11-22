import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryCartPage } from './history-cart.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryCartPageRoutingModule {}
