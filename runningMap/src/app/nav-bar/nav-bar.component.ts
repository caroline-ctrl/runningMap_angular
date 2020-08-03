import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  contentCookie;
  subscribe;

  // breakpointObserver evalue les requetes media et reagit  en fonction de l'évolution
  // .observe() utilisée pour obtenir le flux observable qui emettra chaque fois qu'une requete media aura un resultat different
  // Breakpoints point d'arret pour different type de periphérique
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


    editMenu$ = new Observable<boolean>(observer => {
      this.contentCookie = this.cookieService.get('pseudo');
      if (this.contentCookie) {
        observer.next(true);
      } else {
        observer.next(false);
      }
    });


  constructor(private breakpointObserver: BreakpointObserver, private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    // this.modifNav();

    // actualise la navbar
    this.router.routeReuseStrategy.shouldReuseRoute = (() => {
      return false;
    })
    this.subscribe = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.router.navigated = false;
      }
    });
  }


  // affiche ou cache le menu si le user est connecté ou non.
  // modifNav(){
  //   this.contentCookie = this.cookieService.get('pseudo');
  // }


  // deconnexion
  logout(){
    this.cookieService.deleteAll('http://localhost:3000', '', false, 'Lax');
    alert('Vous êtes deconnecté');

    this.router.navigate(['']);
  }
}
