import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-connexion',
  templateUrl: './user-connexion.component.html',
  styleUrls: [ './user-connexion.component.css' ]
})
export class UserConnexionComponent implements OnInit {
  userConnected;
  connectedPseudo;
  connectedIsActive;
  user: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      mail: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ]
    });
  }

  loginUser() {
    const formValue = this.user.value;
    const data = {
      mail: formValue.mail,
      password: formValue.password
    };

    this.userService.login(data).subscribe(
      (user) => {
        this.userConnected = user;
        // récupère le pseudo et le is_active de l'objet user
        this.connectedPseudo = this.userConnected.pseudo;
        this.connectedIsActive = this.userConnected.is_active;

        // cookie
        this.cookieService.set('pseudo', this.connectedPseudo, 1, 'http://localhost:3000', '', false, 'Lax');
        this.cookieService.set('isActive', this.connectedIsActive, 1, 'http://localhost:3000', '', false, 'Lax');

        alert('Vous êtes connecté');

        this.router.navigate(['index/accueil']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // redirect(){
  //   this.router.navigate(['index/accueil']);
  // }
}
