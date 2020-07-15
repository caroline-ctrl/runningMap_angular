import { Component, OnInit } from '@angular/core';
import { OrsService } from './ors.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
declare let L;
@Component({
  selector: 'app-ors',
  templateUrl: './ors.component.html',
  styleUrls: [ './ors.component.css' ]
})
export class OrsComponent implements OnInit {
  itineraire: FormGroup;
  points;
  startingPoint;
  endPoint;
  subscribe;
  longitude;
  latitude;

  constructor(
    private orsService: OrsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itineraire = this.formBuilder.group({
      startingPoint: [ '', Validators.required ],
      endPoint: [ '', Validators.required ]
    });

    let mymap = L.map('map').setView([ 43.8624, 3.9052 ], 5);

    L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }).addTo(mymap);
  }

  postPoint() {
    const formValue = this.itineraire.value;
    const data = formValue.startingPoint;
    



    this.orsService.postPoint(data).subscribe(
      (result) => {
        const coordinates = result["features"]["0"]['geometry']['coordinates'];
        this.longitude = coordinates["0"];
        this.latitude = coordinates["1"];
        this.addMap(this.latitude, this.longitude);

      },
      (err) => {
        console.log(err);
      }
    );
  }


  // afficher le point sur la carte
  addMap(latitude, longitude) {
    const container = L.DomUtil.get('map'); // je recupère le contenu de map

    if (container !== null || container !== undefined) {
      // si la carte est deja utilisé
      container._leaflet_id = null; // supprime le contenu latitude et longitude

      let mymap = L.map('map').setView([ latitude, longitude ], 20);

      L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
      }).addTo(mymap);

      L.marker([latitude, longitude]).addTo(mymap);
    }
  }
}
