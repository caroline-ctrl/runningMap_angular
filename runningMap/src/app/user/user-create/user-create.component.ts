import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: [ './user-create.component.css' ]
})
export class UserCreateComponent implements OnInit {

  user: FormGroup;
  confirmMp = null;
  mp = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
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
  }

  age_user(n: number): any []{
    return Array(n);
  }
}
