import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.page.html',
  styleUrls: ['./introduccion.page.scss'],
  standalone: false
})
export class IntroduccionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);

    /* no se, un cambio marika */
  }

}
