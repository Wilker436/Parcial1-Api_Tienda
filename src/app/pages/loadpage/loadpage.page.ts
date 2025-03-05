import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loadpage',
  templateUrl: './loadpage.page.html',
  styleUrls: ['./loadpage.page.scss'],
  standalone: false
})
export class LoadpagePage implements OnInit {

  datos: any = null;

  constructor(private router: Router) { }

  

  ngOnInit() {

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datos = navigation.extras.state['datos']; 
    }

    setTimeout(() => {
      this.router.navigate(['/factura'], { state: { datos: this.datos } });
    }, 3000);

    
  }

}
