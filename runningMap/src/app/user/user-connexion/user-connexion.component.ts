import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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

        // pseudo et is_active mis en session
        localStorage.setItem('pseudo', this.connectedPseudo);
        localStorage.setItem('isActive', this.connectedIsActive);
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
