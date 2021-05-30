import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TwichApiService {

  public showContent: boolean;
  public requestType: string;
  public query: string;
  public first: number;

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
  
  private clientid: string = "732j5a64knzlyme439qvle37vispnc";
  private token: string = "8h29ovjtivcztxutyawcmano533pvp";
}
