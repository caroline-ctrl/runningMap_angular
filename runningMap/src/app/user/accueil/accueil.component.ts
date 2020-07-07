import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: [ './accueil.component.css' ]
})
export class AccueilComponent implements OnInit {

  contentCookie;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.emptyCookie();
   }


  emptyCookie(){
    this.contentCookie = this.cookieService.get('pseudo');
  }
}