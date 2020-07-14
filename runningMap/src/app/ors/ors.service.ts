import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORS } from 'openrouteservice-js';

@Injectable({
  providedIn: 'root'
})
export class OrsService {
  private URL_API_ORS = 'https://api.openrouteservice.org';
  private URL_API_OSM = '//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';

  constructor(private http: HttpClient) {}

  postPoint(data) {
    return this.http.post(this.URL_API_OSM, data);
  }
}
