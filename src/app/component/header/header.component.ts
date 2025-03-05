import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {

  searchQuery: string = ''; 

  @Output() searchEvent = new EventEmitter<string>(); 

  onSearch() {
    this.searchEvent.emit(this.searchQuery);
  }

  num: number = 0;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carritoService.getCartItemCount().subscribe(count => {
      this.num = count;
    });
  }



  @Input() param: number = 0;


  irAlcarrit(){
    this.router.navigate(['/carrito'])
  }
  

}
