import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.css' ]
})
export class UserComponent implements OnInit {
  allUsers: User [];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(users => {
      this.allUsers = users;
      console.log(this.allUsers);
    });
  }
}
