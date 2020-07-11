import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-archive',
  templateUrl: './user-archive.component.html',
  styleUrls: [ './user-archive.component.css' ]
})
export class UserArchiveComponent implements OnInit {
  curentUser = null;
  cookiePseudo;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

}
