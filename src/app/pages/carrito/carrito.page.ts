import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { AnimationController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatosCompraService } from 'src/app/services/datos-compra.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false
})
export class CarritoPage implements OnInit {

  products: any[] = []; 
  subtotal: number = 0;
  total: number = 0;

  constructor(
    private carritoSVC: CarritoService,
    private animationCtrl: AnimationController,
    private toastController: ToastController,
    private router: Router,
    private datosSVC: DatosCompraService
  ) { }

  ngOnInit() {

    this.carritoSVC.getCartProducts().subscribe(data => {
      this.products = data;
      this.subtotal = this.getSubtotal();
      this.total = this.getTotal();
    });

  }

  getSubtotal(): number {
    return this.products.reduce((acc, product) => acc + product.price * product.cantidad, 0);
  }
  
  getTotal(): number {
    const subtotal = this.getSubtotal();
    const impuestos = subtotal * 0.16; 
    return subtotal + impuestos;
  }
  

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };


  nombre: string = '';
  apellido: string = '';
  pais: string = '';
  direccion: string = '';
  creditCard: number | undefined;
  cvc: number | undefined;
  fechaDeVencimiento: Date | null = null;
  email: string = '';




  onSubmit(cantidad: number) {
    const datosFormulario = {
      nombre: this.nombre,
      apellido: this.apellido,
      pais: this.pais,
      direccion: this.direccion,
      creditCard: this.creditCard,
      cvc: this.cvc,
      fechaDeVencimiento: this.fechaDeVencimiento,
      email: this.email,
      total: this.total,
      cantidadP: cantidad
    };

    this.presentToast("top");

    this.datosSVC.guardarDatos(datosFormulario);

    setTimeout(() => {
      this.router.navigate(['/loadpage']);
    }, 1500);

  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Transaccion en proceso',
      duration: 1500,
      position: position,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }

}
