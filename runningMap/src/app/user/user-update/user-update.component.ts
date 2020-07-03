import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: [ './user-update.component.css' ]
})
export class UserUpdateComponent implements OnInit {
  currentUser = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserById(this.route.snapshot.paramMap.get('id'));
  }

  getUserById(id: string) {
    this.userService.getUserById(id).subscribe(
      (user) => {
        this.currentUser = user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateUser() {
    const data = {
      firstname: this.currentUser.firstname,
      lastname: this.currentUser.lastname,
      pseudo: this.currentUser.pseudo,
      mail: this.currentUser.mail,
      city: this.currentUser.city,
      gender: this.currentUser.gender,
      age: this.currentUser.age,
      password: this.currentUser.password,
      is_active: this.currentUser.is_active
    };

    const id = this.currentUser._id;

    this.userService.updateUser(id, data).subscribe(
      (result) => {
        console.log('user modifié');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
