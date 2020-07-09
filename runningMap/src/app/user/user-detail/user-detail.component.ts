import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {
  currentUser = null;
  pseudo = null;
  mp: FormGroup;
  confirmMp;
  password;
  hashMp = null;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pseudo = this.cookieService.get('pseudo');
    this.getBypseudo();

    this.mp = this.formBuilder.group({
      oldpPasswd: [ '', Validators.required ],
      newPasswd: [ '', Validators.required ],
      confirmNewPasswd: ['', Validators.required]
    });
  }

  // recupère le pseudo du cookie qu'il envoie a l'api et recupère l'objet user
  getBypseudo() {
    this.userService.getUserByPseudo(this.pseudo).subscribe(
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
        alert('Mot de passe modifié');
      },
      (err) => {
        console.log(err);
      }
    );
  }


  // supprimer compte
  archivUser() {
    const data = {
      pseudo: this.currentUser.pseudo,
    };

    this.userService.archiveUser(data).subscribe(() => {
        if (confirm("Voulez vous supprimer votre compte ?")){
          this.cookieService.deleteAll('http://localhost:3000', '', false, 'Lax');
          this.router.navigate(['index/accueil']);
        }
      });
  }
}
