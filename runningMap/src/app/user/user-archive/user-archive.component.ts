import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-archive',
  templateUrl: './user-archive.component.html',
  styleUrls: ['./user-archive.component.css']
})
export class UserArchiveComponent implements OnInit {

  curentUser = null;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserByIde(this.route.snapshot.paramMap.get('id'));
  }

  getUserByIde(id){
    this.userService.getUserById(id).subscribe(user => {
      this.curentUser = user;
    }, err => {
      console.log(err);
    });
  }

  archivUser(){
    const data = {
      is_active: false
    };

    const id = this.curentUser._id;

    this.userService.archiveUser(id, data).subscribe(result => {
      console.log('user archivé');
    }, err => {
      console.log(err);
    });
  }

}
