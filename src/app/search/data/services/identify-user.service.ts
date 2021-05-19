import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/identify-user.model';
import { RepositoryModel } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class IdentifyUserService {

  public subject = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  public searchUser(name: string): Observable<UserModel> {
    const url = `https://api.github.com/search/users?q=${name}`;
    if (name !== undefined) {
      return this.http.get<UserModel>(url);
    }
  }

  public setUser(user: UserModel) {
    this.subject.next(user);
  }

  public getUser(): UserModel {
    return this.subject.getValue();
  }

  public searchRepository(name: string): Observable<RepositoryModel> {
    const url = `https://api.github.com/search/repositories?q=${name}`;
    return this.http.get<RepositoryModel>(url);
  }

  public setRepository(repo: RepositoryModel) {
    this.subject.next(repo);
  }

  public getRepo(): RepositoryModel {
    return this.subject.getValue();
  }
}
