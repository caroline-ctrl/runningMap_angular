import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  currentUser = null;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getById(this.route.snapshot.paramMap.get('id'));
  }

  getById(id) {
    this.userService.getUserById(id).subscribe(user => {
      this.currentUser = user;
    }, err => {
      console.log(err);
    });
  }

}
