import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
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
        console.log(this.userConnected);
        this.connectedPseudo = this.userConnected.pseudo;
        this.connectedIsActive = this.userConnected.is_active;
      
        localStorage.setItem('pseudo', this.connectedPseudo);
        localStorage.setItem('isActive', this.connectedIsActive);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
