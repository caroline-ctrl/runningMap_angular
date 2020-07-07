import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      pseudo: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      age: [null, Validators.required],
      password: ['', Validators.required],
      is_active: true,
      confirmPassword: ['', Validators.required]
    });
  }


  createUser() {
    const formValue = this.user.value;
    const data = new User (
      formValue.firstname,
      formValue.lastname,
      formValue.pseudo,
      formValue.mail,
      formValue.city,
      formValue.gender,
      formValue.age,
      formValue.password,
      formValue.is_active
    );

    this.confirmMp = this.user.value.confirmPassword;
    this.mp = this.user.value.password;

    this.userService.createUser(data).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.log(err);
      }
    );


    this.userService.login(data).subscribe(
      (user) => {
        this.userConnected = user;
        // récupère le pseudo et le is_active de l'objet user
        this.connectedPseudo = this.userConnected.pseudo;
        this.connectedIsActive = this.userConnected.is_active;

        // cookie
        this.cookieService.set('pseudo', this.connectedPseudo, 1, 'http://localhost:3000', '', false, 'Lax');
        this.cookieService.set('isActive', this.connectedIsActive, 1, 'http://localhost:3000', '', false, 'Lax');

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
