import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadpagePageRoutingModule } from './loadpage-routing.module';

import { LoadpagePage } from './loadpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadpagePageRoutingModule
  ],
  declarations: [LoadpagePage]
})
export class LoadpagePageModule {}
