import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TiendaApiService } from 'src/app/services/tienda-api.service';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
  standalone: false
})
export class DetailProductPage implements OnInit {

  productId: string = '';
  product = null as any

  constructor(
    private actRoute: ActivatedRoute,
    private tiendaSVC: TiendaApiService
  ) {
    this.productId = this.actRoute.snapshot.paramMap.get('id') as string
   }

  ngOnInit() {
    this.getProductById(this.productId);
  }



  getProductById(id: string){
    this.tiendaSVC.getProductsById(id).subscribe({

      next: (res: any) => {

        this.product = res;
        console.log(this.product)
      },
      error: (error: any) => {

      }

    })
  }
}
