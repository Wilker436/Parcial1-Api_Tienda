import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SliderComponent } from './slider.component';
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [SliderComponent], 
  imports: [CommonModule, IonicModule, FormsModule ], 
  exports: [SliderComponent] 
})
export class SlideeModule {} 