import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

   user: User = {
    firstname: '',
    lastname: '',
    pseudo: '',
    mail: '',
    city: '',
    gender: '',
    age: null,
    password: '',
    is_active: true
  }

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  createUser() {
    const data = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      pseudo: this.user.pseudo,
      mail: this.user.mail,
      city: this.user.city,
      gender: this.user.gender,
      age: this.user.age,
      password: this.user.password,
      is_active: this.user.is_active
    };

    this.userService.createUser(data).subscribe(result => {
      console.log(result);
    }, err => {
      console.log(err);
    });
  }

}
