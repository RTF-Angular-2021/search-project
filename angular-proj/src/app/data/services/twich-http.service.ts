import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwichHttpService {
  private TWICH_CLIENT_ID: string = "732j5a64knzlyme439qvle37vispnc";
  private TWICH_SECRET: string = "3nyaq1ja8lj4nf9exyxagw3md7mf6w";
  private TWICH_TOKEN: string = "8h29ovjtivcztxutyawcmano533pvp";

  public showContent: boolean;
  public requestType: string;
  public query: string;
  public first: number;

  constructor(private http: HttpClient) {
    this.requestType = "categories";
    this.showContent = false;
    this.query = "";
    this.first = 20;
  }

  execRequest(): Observable<JSON> {
    return this.requestType === "categories" ? 
      this.fetchTwichCategories() : this.fetchTwichChannels();
  }

  private fetchTwichCategories(): Observable<JSON> {
    
    return this.http.get<JSON>(`https://api.twitch.tv/helix/search/categories?query=${this.query}&first=${this.first}`, {
    headers: {
      'Authorization': `Bearer ${this.TWICH_TOKEN}`,
      'Client-Id': this.TWICH_CLIENT_ID
      }
    });
  }

  private fetchTwichChannels(): Observable<JSON> {
    return this.http.get<JSON>(`https://api.twitch.tv/helix/search/channels?query=${this.query}&first=${this.first}`, {
    headers: {
      'Authorization': `Bearer ${this.TWICH_TOKEN}`,
      'Client-Id': this.TWICH_CLIENT_ID
      }
    });
  }
}
