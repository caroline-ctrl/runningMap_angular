import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_API = 'mongodb+srv://carod:clemL34270+@cluster0-fbriu.gcp.mongodb.net/running_map?retryWrites=true&w=majority';

  constructor(private http: HttpClient) { }

  getUserById(id: string) {
    return this.http.get<User>(this.URL_API + id);
  }
}
