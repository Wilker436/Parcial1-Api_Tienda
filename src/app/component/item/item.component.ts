import { Component, OnInit,  Input } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: false
})
export class ItemComponent  implements OnInit {

  
  @Input() product: any;
  cantidad: number = 0

  constructor(
        private carritoService: CarritoService,
        private toastController: ToastController,
  ) { }

  ngOnInit() {
    if(this.product){
      this.cantidad = this.product.cantidad;
    }
  }

  getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5; 
  
    for (let i = 0; i < fullStars; i++) {
      stars.push('fas fa-star'); 
    }
  
    if (hasHalfStar) {
      stars.push('fas fa-star-half-alt'); 
    }
  
    while (stars.length < 5) {
      stars.push('far fa-star'); 
    }
  
    return stars;
  }


  validarCantidad() {
    if (this.cantidad < 1 || isNaN(this.cantidad)) {
      this.cantidad = 1; 
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Producto Borrado',
      duration: 1500,
      position: position,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }

  dropCart(id: number){
    this.carritoService.removeFromCart(id);
    this.presentToast('top')
  }

}
