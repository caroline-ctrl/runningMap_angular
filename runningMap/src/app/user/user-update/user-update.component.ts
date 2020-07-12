import { Component, OnInit, NgModule } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ngfModule, ngf } from "angular-file"

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: [ './user-update.component.css' ]
})
export class UserUpdateComponent implements OnInit {
  currentUser = null;
  imageSrc: string;
  fileToUpload: File = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
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
      avatar: this.currentUser.avatar,
      firstname: this.currentUser.firstname,
      lastname: this.currentUser.lastname,
      pseudo: this.currentUser.pseudo,
      mail: this.currentUser.mail,
      city: this.currentUser.city,
      gender: this.currentUser.gender,
      age: this.currentUser.age,
    };

    console.log(data);

    const id = this.currentUser._id;

    this.userService.updateUser(id, data).subscribe(
      (result) => {
        console.log('user modifié');
        // this.router.navigate(["index/accueil"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  sendFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }


  updateAvatar(){
    const data = {
      avatar: "assets/images/" + this.fileToUpload.name,
      firstname: this.currentUser.firstname,
      lastname: this.currentUser.lastname,
      pseudo: this.currentUser.pseudo,
      mail: this.currentUser.mail,
      city: this.currentUser.city,
      gender: this.currentUser.gender,
      age: this.currentUser.age,
    };

    const id = this.currentUser._id;

    this.userService.updateUser(id, data).subscribe(
      (result) => {
        console.log('user modifié');
        // this.router.navigate(["index/accueil"]);
      },
      (err) => {
        console.log(err);
      }
    );

  }

  age_user(n: number): any []{
    return Array(n);
  }
}
