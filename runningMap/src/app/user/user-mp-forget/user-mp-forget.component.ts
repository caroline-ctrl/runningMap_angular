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

  sendMail() {
    this.mail = this.user.value.mail;

    this.userService.mail(this.mail).subscribe(() => {
      alert('Un mail vient de vous être envoyé');
      this.messageCode = prompt('Renseigner votre code envoyé par mail'); // messageCode contient le code envoyé par le user
      this.verifyCode(this.messageCode);
      // this.router.navigate(['index/accueil']);
    });
  }

  verifyCode(code) {
    this.userService.verifyCode(this.mail).subscribe((user) => {
      this.currentUser = user;
      if (code === this.currentUser.token){
        this.router.navigate(['index/password']);
        this.cookieService.set('token', code, 7, 'http://localhost:3000', '', false, 'Lax');
      } else {
        alert('Le code n\est pas bon');
      }
    }, err => {
      console.log(err);
    });
  }
}
