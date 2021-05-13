import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/identify-user.model';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class IdentifyUserService {

  constructor(private http: HttpClient) {}

  public getUser(name: string): Observable<User> {
    const url = `https://api.github.com/search/users?q=${name}`;
    if (name !== undefined) {
      return this.http.get<User>(url);
    }
  }

  public getRepository(name: string): Observable<Repository> {
    const url = `https://api.github.com/search/repositories?q=${name}`;
    return this.http.get<Repository>(url);
  }
}
