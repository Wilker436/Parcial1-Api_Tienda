import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from 'src/app/component/header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { TiendaApiService } from '../services/tienda-api.service';
import { CardModule } from '../component/card-product/card-product.module';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../services/carrito.service';{}
import { ItemModule } from '../component/item/item.module';
import { SlideeModule } from '../component/slider/slider.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
    HttpClientModule,
    CardModule,
    RouterModule

  ],
  exports: [
    HeaderModule,
    CardModule,
    RouterModule,
    ItemModule,
    SlideeModule
  ],
  providers: [TiendaApiService, CarritoService]
})
export class SharedModule { }
