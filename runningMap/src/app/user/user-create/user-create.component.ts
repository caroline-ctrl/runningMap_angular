import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: [ './user-create.component.css' ]
})
export class UserCreateComponent implements OnInit {

  user: FormGroup;
  confirmMp = null;
  mp = null;
  connectedPseudo;
  connectedIsActive;
  userConnected;



  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      avatar: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      pseudo: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      age: [null, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }


  createUser() {
    const avatar = 'avatar.png';
    const formValue = this.user.value;
    const data = new User (
      avatar,
      formValue.firstname,
      formValue.lastname,
      formValue.pseudo,
      formValue.mail,
      formValue.city,
      formValue.gender,
      formValue.age,
      formValue.password,
    );

    this.confirmMp = formValue.confirmPassword;
    this.mp = formValue.password;

    this.userService.createUser(data).subscribe(
      (result) => {
        console.log(result);
        this.cookieService.set('pseudo', data.pseudo, 1, 'http://localhost:3000', '', false, 'Lax');
        alert('Vous êtes inscrit');
        this.router.navigate(['index/accueil']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  age_user(n: number): any []{
    return Array(n);
  }
}
