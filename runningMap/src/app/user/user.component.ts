import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.css' ]
})
export class UserComponent implements OnInit {
  private currentUser = null;

  constructor(
    private serviceUser: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getById(this.route.snapshot.paramMap.get('id'));
  }

  // id sera ensuite en fonction de la session
  getById(id) {
    this.serviceUser.getUserById(id).subscribe(
      (user) => {
        this.currentUser = user;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
