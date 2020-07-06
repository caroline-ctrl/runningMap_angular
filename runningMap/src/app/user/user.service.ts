import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllUser() {
    return this.http.get<User[]>(this.URL_API + '/users');
  }

  getUserById(id: string) {
    return this.http.get<User>(this.URL_API + '/user/' + id);
  }

  createUser(data) {
    return this.http.post<User>(this.URL_API + '/create/' , data);
  }

  updateUser(id, data) {
    return this.http.put<User>(this.URL_API + '/update/' + id, data);
  }

  archiveUser(id, data) {
    return this.http.put<User>(this.URL_API + '/archive/' + id, data);
  }

  activeUser(id, data) {
    return this.http.put<User>(this.URL_API + '/activer/' + id, data);
  }

  login(data) {
    return this.http.post<User>(this.URL_API + '/log/', data);
  }
}
