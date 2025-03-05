import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'introduccion',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'introduccion',
    loadChildren: () => import('./pages/introduccion/introduccion.module').then( m => m.IntroduccionPageModule)
  },
  {
    path: 'detail-product/:id',
    loadChildren: () => import('./pages/detail-product/detail-product.module').then( m => m.DetailProductPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'factura',
    loadChildren: () => import('./pages/factura/factura.module').then( m => m.FacturaPageModule)
  },
  {
    path: 'loadpage',
    loadChildren: () => import('./pages/loadpage/loadpage.module').then( m => m.LoadpagePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
