import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: [ './user-password.component.css' ]
})
export class UserPasswordComponent implements OnInit {
  password: FormGroup;
  token;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.cookieService.get('token');

    this.password = this.formBuilder.group({
      newPasswd: [ '', Validators.required ],
      confirmNewPasswd: [ '', Validators.required ]
    });
  }

  editPassword(){
    const formValue = this.password.value;
    const data = {
      password: formValue.newPasswd,
      token: this.token
    };

    this.userService.changePassword(data).subscribe(user => {
      console.log(user)
      this.cookieService.set('pseudo', user.pseudo, 7, 'http://localhost:3000', '', false, 'Lax');
      this.cookieService.delete('token');
      this.router.navigate(['index/accueil']);
    });
  }
}
