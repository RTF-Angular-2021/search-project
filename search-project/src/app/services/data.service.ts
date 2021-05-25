import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { CardResult} from "../app.component";

@Injectable()
export class HttpService{

  constructor(private http: HttpClient){};

  getUserData(query:string):Observable<CardResult[]>{
    return this.http.get(`https://api.github.com/search/users?q=${query}`).pipe(map((data:any)=>{
      let resultList = data["items"];
      return resultList.map(function(card): CardResult {
        return {name:card.login, img_user:card.avatar_url,url:card.html_url,keyword:query,
          create_date:card.id,total_count:data["total_count"]};
      });
    }));
  }

  getRepositoryData(query:string):Observable<CardResult[]>{
    return this.http.get(`https://api.github.com/search/repositories?q=${query}`).pipe(map((data:any)=>{
      let resultList = data["items"];
      return resultList.map(function(card): CardResult {
        return {name:card.name, img_user:card.owner.avatar_url,url:`https://github.com/${card.full_name}`,
          keyword:query,create_date:card.created_at,total_count:data["total_count"]};
      });
    }));
  }
}
