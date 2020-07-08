import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  currentUser = null;
  data = null;

  constructor(private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.data = this.cookieService.get('pseudo');
    this.getBypseudo();
  }

  getBypseudo() {
    console.log(this.data);
    this.userService.getUserByPseudo(this.data).subscribe(user => {
      this.currentUser = user;
    }, err => {
      console.log(err);
    });
  }

}
