import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
  standalone: false,
})
export class CardProductComponent  implements OnInit {

  constructor(
    private router: Router,
    private carritoService: CarritoService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
  // Método requerido por Angular, sin lógica por ahora
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
  
  @Input() product: any
  @Input() param: number = 0;
  cantidad: number = 1;


  onClick(){
    this.router.navigate(['detail-product', this.product.id]);
  }


  addCart() {

    this.validarCantidad();

    if (this.product) 
      {
      const productoAAgregar = {
        id: this.product.id,
        title: this.product.title,
        price: this.product.price,
        description: this.product.description,
        category: this.product.category,
        image: this.product.image,
        rating: {
          rate: this.product.rating.rate,
          count: this.product.rating.count
        },
        cantidad: this.cantidad 
      };
  
      this.carritoService.addToCart(productoAAgregar);
      this.presentToast('top');

      setTimeout(() => {
        window.location.reload();
      }, 1501);

      
    }
  }

  validarCantidad() {
    if (this.cantidad < 1 || isNaN(this.cantidad)) {
      this.cantidad = 1; 
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Producto agregado',
      duration: 1500,
      position: position,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }

  productC: any[] = []; 

  mostarLocal(){
    this.carritoService.getCartProducts().subscribe(data => {
      this.productC = data;
    });

    console.log(this.productC)
   /*  this.carritoService.clearCart(); */
  }

  
    
  }



  

