import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TwichApiService {
  public query: string;
  public first: number;
  public showContent: boolean;
  public requestType: string;
  constructor(private http: HttpClient) {
    this.requestType = "categories";
    this.showContent = false;
    this.query = "";
    this.first = 50;
  }
  public execRequest(): Observable<JSON> {
    return this.requestType === "categories" ? 
      this.fetchTwichCategories() : this.fetchTwichChannels();
  }
  private fetchTwichCategories(): Observable<JSON> {  
    return this.http.get<JSON>(`https://api.twitch.tv/helix/search/categories?query=${this.query}&first=${this.first}`, {
    headers: {
      'Authorization': `Bearer ${this.token}`,
      'Client-Id': this.clientid
      }
    });
  }
  private fetchTwichChannels(): Observable<JSON> {
    return this.http.get<JSON>(`https://api.twitch.tv/helix/search/channels?query=${this.query}&first=${this.first}`, {
    headers: {
      'Authorization': `Bearer ${this.token}`,
      'Client-Id': this.clientid
      }
    });
  }  
  private clientid: string = "gp762nuuoqcoxypju8c569th9wz7q5";
  private token: string = "ga3yw0m4fcyzxbhp656n7pwun4momv";
}
