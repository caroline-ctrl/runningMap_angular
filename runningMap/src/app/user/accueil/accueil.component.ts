import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: [ './accueil.component.css' ]
})
export class AccueilComponent implements OnInit {
  userConnected;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  loginUser() {
    this.userService.login().subscribe(user => {
      console.log(user);
      this.userConnected = user;
    }, err => {
      console.log(err);
    });
  }
}
