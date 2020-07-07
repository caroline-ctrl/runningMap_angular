import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-connexion',
  templateUrl: './user-connexion.component.html',
  styleUrls: ['./user-connexion.component.css']
})
export class UserConnexionComponent implements OnInit {

  userConnected;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.userService.login().subscribe(user => {
      this.userConnected = user;
      console.log(this.userConnected);
    }, err => {
      console.log(err);
    });
  }

}
