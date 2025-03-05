import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardProductComponent } from './card-product.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CardProductComponent], 
  imports: [CommonModule, IonicModule, FormsModule], 
  exports: [CardProductComponent] 
})
export class CardModule {} 
