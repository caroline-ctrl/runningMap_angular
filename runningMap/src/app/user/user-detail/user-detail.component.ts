import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {
  currentUser = null;
  data = null;
  mp: FormGroup;
  confirmMp;
  password;
  hashMp = null;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.data = this.cookieService.get('pseudo');
    this.getBypseudo();

    this.mp = this.formBuilder.group({
      oldpPasswd: [ '', Validators.required ],
      newPasswd: [ '', Validators.required ],
      confirmNewPasswd: ['', Validators.required]
    });
  }

  // recupère le pseudo du cookie qu'il envoie a l'api et recupère l'objet user
  getBypseudo() {
    this.userService.getUserByPseudo(this.data).subscribe(
      (user) => {
        this.currentUser = user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // modif le mp
  editMp() {
    const formValue = this.mp.value;
    const data = {
      pseudo: this.currentUser.pseudo,
      oldPasswd: formValue.oldpPasswd,
      NewPasswd: formValue.newPasswd
    };

    this.userService.updatePassword(data).subscribe(
      (result) => {
        console.log('mot de passe modifié');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
