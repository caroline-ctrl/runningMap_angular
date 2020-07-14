import { Component, OnInit } from '@angular/core';
import { OrsService } from './ors.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare let L;
@Component({
  selector: 'app-ors',
  templateUrl: './ors.component.html',
  styleUrls: [ './ors.component.css' ]
})
export class OrsComponent implements OnInit {
  itineraire: FormGroup;
  points = null;

  constructor(
    private orsService: OrsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.itineraire = this.formBuilder.group({
      startingPoint: [ '', Validators.required ],
      endPoint: [ '', Validators.required ]
    });

    this.addMap();
  }

  postPoint() {
    const formValue = this.itineraire.value;
    const data = {
      startingPoint: formValue.startingPoint,
      endPoint: formValue.endPoint
    };

    this.orsService.postPoint(data).subscribe(
      (result) => {
        this.points = result;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  addMap () {
    let mymap = L.map('map').setView([43.8624, 3.9052], 13);
    
    L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18,
    }).addTo(mymap);
  }
}
