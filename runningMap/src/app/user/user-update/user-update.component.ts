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
  imageSrc: string;
  fileToUpload: File = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getUserById(this.route.snapshot.paramMap.get('id'));
  }

  // recupère l'objet user a partir de l'id
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

  // modifie le user et renvoie un message
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
      avatar: this.fileToUpload.name,
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
