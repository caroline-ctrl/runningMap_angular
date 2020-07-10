import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-mp-forget',
  templateUrl: './user-mp-forget.component.html',
  styleUrls: [ './user-mp-forget.component.css' ]
})
export class UserMpForgetComponent implements OnInit {

  user: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      mail: [ '', [ Validators.required, Validators.email ] ]
    });
  }

  envoieMail() {
    const data = this.user.value.mail;
    console.log(data);

    this.userService.mail(data).subscribe(() => {
      console.log(data);
      alert('Mail envoyé');
      // this.router.navigate(['index/accueil']);
    });
  }
}
