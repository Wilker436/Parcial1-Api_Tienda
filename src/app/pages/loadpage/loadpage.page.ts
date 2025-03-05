import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loadpage',
  templateUrl: './loadpage.page.html',
  styleUrls: ['./loadpage.page.scss'],
  standalone: false
})
export class LoadpagePage implements OnInit {


  constructor(private router: Router) { }

  

  ngOnInit() {


    setTimeout(() => {
      this.router.navigate(['/factura']);
    }, 3000);

    
  }

}
