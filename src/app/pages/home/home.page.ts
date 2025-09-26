import { Component, OnInit } from '@angular/core';
import { TiendaApiService } from 'src/app/services/tienda-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})


export class HomePage implements OnInit {

   products: any[] = []; 


  constructor(
    private tiendaSVC: TiendaApiService
  ) { }

  ngOnInit() {
    this.getProducts();
  }


  searchQuery: string = ''; 
  selectedCategory: string = ''; 
  
  getProducts(cat?: string, query?: string) {
    this.selectedCategory = cat || '';
    this.searchQuery = query || ''; 
  
    this.tiendaSVC.getProducts().subscribe({
      next: (res: any) => { 
        this.products = [];
  
        for (let product of res) {
          const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
          
          const matchesSearch = !this.searchQuery || product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
  
          if (matchesCategory && matchesSearch) { 
            this.products.push(product);
          }
        }
  
        console.log(this.products);
      },
      error: (error: any) => {
        console.error("Error al obtener productos", error);

        console.log("pepe");
      }
    });
  }

  slideData = [
    {
      img: "https://http2.mlstatic.com/D_NQ_842909-MLA82190792792_022025-OO.webp",
      title: "Gratis",
      description: "",
    },
    {
      img: "https://http2.mlstatic.com/D_NQ_652080-MLA82822258505_032025-OO.webp",
      title: "Tecnologia",
      description: "",
    },
    {
      img: "https://http2.mlstatic.com/D_NQ_787228-MLA82555315724_032025-OO.webp",
      title: "Hogar",
      description: "",
    },
  ]
  


  

}


