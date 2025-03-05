import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { DatosCompraService } from 'src/app/services/datos-compra.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
  standalone: false
})
export class FacturaPage implements OnInit {

  datos: any = {};

  constructor(
    private router: Router,
    private carritoSVC: CarritoService,
    private DatosSVC: DatosCompraService,
  ) { }

  ngOnInit() {

    this.obtenerDatos();

    console.log('Datos recibidos:', this.datos);
  }


  onClick() {
    this.carritoSVC.clearCart();
    this.DatosSVC.borrarDatos();


    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

  obtenerDatos() {
    this.datos = this.DatosSVC.obtenerDatos();
  }

}
