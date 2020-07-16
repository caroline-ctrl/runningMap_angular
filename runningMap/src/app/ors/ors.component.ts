import { Component, OnInit } from '@angular/core';
import { OrsService } from './ors.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import * as L from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-ors',
  templateUrl: './ors.component.html',
  styleUrls: ['./ors.component.css']
})
export class OrsComponent implements OnInit {
  itineraire: FormGroup;
  // reactivForm
  startingPoint;
  endPoint;
  // valeur coordonnées gps start
  longitudeStart;
  latitudeStart;
  // valeur coordonnées gps end
  longitudeEnd;
  latitudeEnd;
  // convertion en string
  pointsstartLon;
  pointsstartLat;
  pointsEndLong;
  pointsEndLat;
  // coordonnées string depart
  start;
  end;
  // map
  mymap;
  mymapItineraire;

  constructor(
    private orsService: OrsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itineraire = this.formBuilder.group({
      startingPoint: [ '', Validators.required ],
      endPoint: [ '', Validators.required ]
    });

    this.mymap = L.map('map').setView([ 43.6112422, 3.8767337 ], 15);

    L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }).addTo(this.mymap);
  }


  getStartingPoint() {
    const formValue = this.itineraire.value;
    const data = formValue.startingPoint;

    this.orsService.getStartingPoint(data).subscribe(
      (resultStart) => {
        const coordinates =
          resultStart['features']['0']['geometry']['coordinates'];
        this.longitudeStart = coordinates['0'];
        this.latitudeStart = coordinates['1'];
        this.pointsstartLon = this.longitudeStart + '';
        this.pointsstartLat = this.latitudeStart + '';

        this.start = this.pointsstartLon + ',' + this.pointsstartLat;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEndPoint() {
    const formValue = this.itineraire.value;
    const dataEnd = formValue.endPoint;

    this.orsService.getEndPoint(dataEnd).subscribe(
      (resultEnd) => {
        const coordinates =
          resultEnd['features']['0']['geometry']['coordinates'];
        this.longitudeEnd = coordinates['0'];
        this.latitudeEnd = coordinates['1'];
        this.pointsEndLong = this.longitudeEnd + '';
        this.pointsEndLat = this.latitudeEnd + '';
        this.end = this.pointsEndLong + ',' + this.pointsEndLat;

        this.direction('foot-walking', this.start, this.end);
        // this.addMapStarting(this.start, this.end);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  direction(locomotion, start, end) {
    this.orsService.direction(locomotion, start, end).subscribe(
      (result) => {
        
        if (this.mymap) {
          // si la carte est deja utilisé
          this.mymap.eachLayer(function(layer){layer.remove();});
          this.mymap.remove();
          this.mymap = null;
          // si la carte est deja utilisé

          this.mymapItineraire = L.map('map').setView(
            [ this.latitudeStart, this.longitudeStart ],
            18
          );

          L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18
          }).addTo(this.mymapItineraire);
        }

        const tablePoints = result['features']['0']['geometry']['coordinates'];
        for (let i = 0; i < tablePoints.length; i++) {
          L.marker([ tablePoints[i]['1'], tablePoints[i]['0'] ]).addTo(this.mymapItineraire);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
