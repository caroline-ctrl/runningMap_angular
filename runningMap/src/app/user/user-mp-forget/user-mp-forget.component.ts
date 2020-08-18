import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-mp-forget',
  templateUrl: './user-mp-forget.component.html',
  styleUrls: [ './user-mp-forget.component.css' ]
})
export class UserMpForgetComponent implements OnInit {
  user: FormGroup;
  messageCode = null;
  mail = null;
  currentUser = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      mail: [ '', [ Validators.required, Validators.email ] ]
    });
  }

  // envoie de mail
  sendMail(): void {
    // recupère la valeur de l'input du formulaire
    this.mail = this.user.value.mail;

    this.userService.mail(this.mail).subscribe((user) => {
      // permet d'obtenir la longueur de l'objet
      if(Object.keys(user).length > 0) {
        alert('Un mail vient de vous être envoyé');
        // messageCode contient le code envoyé par le user
        this.messageCode = prompt('Renseigner votre code envoyé par mail');
        // verifie si le code est identique entre la bdd et celui renseigné
        this.verifyCode(this.messageCode);
        // si l'objet est vide
      } else if (Object.keys(user).length === 0){
        alert('L\'adresse mail n\'existe pas');
      }
    }, err => {
      alert(err);
    });
  }

  // verifie le code de sécurité
  verifyCode(code): void {
    this.userService.verifyCode(this.mail).subscribe((user) => {
      this.currentUser = user;
      if (code === this.currentUser.token){
        // redirige vers la page password
        this.router.navigate(['index/password']);
        // met le code de sécurité en cookie
        this.cookieService.set('token', code, 7, 'http://localhost:3000', '', false, 'Lax');
      } else {
        alert('Le code n\est pas bon');
      }
    }, err => {
      console.log(err);
    });
  }
}
