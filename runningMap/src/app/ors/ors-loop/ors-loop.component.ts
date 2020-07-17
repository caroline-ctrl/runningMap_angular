import { Component, OnInit } from '@angular/core';
import { OrsService } from '../ors.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as L from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [ 25, 41 ],
  iconAnchor: [ 12, 41 ],
  popupAnchor: [ 1, -34 ],
  tooltipAnchor: [ 16, -28 ],
  shadowSize: [ 41, 41 ]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-ors-loop',
  templateUrl: './ors-loop.component.html',
  styleUrls: ['./ors-loop.component.css']
})
export class OrsLoopComponent implements OnInit {
  itineraire: FormGroup;
  mymap;

  constructor(
    private orsService: OrsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mymap = L.map('map').setView([ 43.6112422, 3.8767337 ], 15);

    L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }).addTo(this.mymap);
  }

}
