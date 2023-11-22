import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-home',
        loadChildren: () =>
          import('../tab-home/tab-home.module').then(
            (m) => m.TabHomePageModule
          ),
      },
      {
        path: 'tab-category',
        loadChildren: () => import('../tab-category/tab-category.module').then( m => m.TabCategoryPageModule)
      },
      {
        path: 'tab-account',
        loadChildren: () =>
          import('../tab-account/tab-account.module').then(
            (m) => m.TabAccountPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab-home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab-home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
