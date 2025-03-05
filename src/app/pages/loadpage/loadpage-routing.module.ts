import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadpagePage } from './loadpage.page';

const routes: Routes = [
  {
    path: '',
    component: LoadpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadpagePageRoutingModule {}
