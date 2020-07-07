import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: [ './accueil.component.css' ]
})
export class AccueilComponent implements OnInit {



  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    console.log(this.cookieService.get('pseudo'));
  }


}
