import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-user-mp-forget',
  templateUrl: './user-mp-forget.component.html',
  styleUrls: [ './user-mp-forget.component.css' ]
})
export class UserMpForgetComponent implements OnInit {

  user: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      mail: [ '', [ Validators.required, Validators.email ] ]
    });
  }

  envoieMail() {
    const mailUser = this.user.value.mail;
  }
}
