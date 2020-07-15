import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORS } from 'openrouteservice-js';

@Injectable({
  providedIn: 'root'
})
export class OrsService {
  private URL_API_ORS = 'https://api.openrouteservice.org';
  private URL_API_OSM = '//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
  private API_KEY = '5b3ce3597851110001cf6248e4f4182f661b4d95829edd912435b2f4';

  constructor(private http: HttpClient) {}

  postPoint(data) {
    return this.http.get(this.URL_API_ORS + '/geocode/search?api_key=' + this.API_KEY + '&text=' + data);
  }
}
