import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
  standalone: false
})
export class FacturaPage implements OnInit {

  datos: any = null;

  constructor(
    private router: Router,
    private carritoSVC: CarritoService
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datos = navigation.extras.state['datos']; 
    }
    

    console.log('Datos recibidos:', this.datos);
  }

  onClick(){
    
    this.carritoSVC.clearCart();
    this.router.navigate(['/home'])

  }

}
