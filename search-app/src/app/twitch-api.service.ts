import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, share, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TwitchApiService {
  private oathUrl = 'https://id.twitch.tv/oauth2/token';
  private apiUrl = 'https://api.twitch.tv/helix';
  public test = 0;

  private get token() {
    return localStorage.getItem('token');
  }

  private get clientId() {
    return localStorage.getItem('clientId');
  }

  private get clientSecret() {
    return localStorage.getItem('clientSecret');
  }

  private searchResult: {data: Array<any>, pagination: {cursor: string}} = {
    data: [], 
    pagination: { cursor: '' }
  };

  constructor(
    private http: HttpClient,
  ) { }


  /**
   * Делает запрос на сервер для получения результатов поиска Категорий по запросу. Возвращает Observable с true, если успешно,
   * и с false в противном случае.
   * 
   * Для получения результатов последнего поиска использовать метод getLastSearchData(), максимум - 20 элементов.
   * 
   * @param query Строка, по которой искать Категории
   * @param continueSearch Продолжать ли поиск с последней пагинации
   * @returns Observable с true, если успешно,
   * и с false в противном случае. 
   */
  public trySearchCategories(query: string, continueSearch: boolean): Observable<boolean> {
    if (!this.isAuthenticated) 
      return of(false).pipe(share());

    const url = continueSearch 
      ? this.apiUrl + `/search/categories?query=${query}&after=${this.searchResult.pagination.cursor}` 
      : this.apiUrl + `/search/categories?query=${query}`;

    const searchCategoriesStream$ =  this.http.get(
      url, 
      {
        headers: new HttpHeaders({
          'Authorization':  `Bearer ${this.token}`,
          'Client-Id':  `${this.clientId}`,
        })
      }
    ).pipe(
      share(), 
      catchError((error) => {console.log(error); return of(error);})
    );

    searchCategoriesStream$.subscribe(response => {
      console.log(response);

      if (!(response instanceof HttpErrorResponse)) {
        this.searchResult = response.data ? response : {data: [], pagination: { cursor: '' }};
      }
    });

    return searchCategoriesStream$.pipe(map((response) => !(response instanceof HttpErrorResponse)));
  }

  /**
   * Метод для получения результатов последнего поиска
   * @returns результат последнего поиска
   */
  public getLastSearchData(): Array<any> {
    return this.searchResult.data;
  }

  /**
   * Делает запрос на сервер для получения токена. Возвращает Observable с true, если успешно,
   * и с false в противном случае.
   * 
   * @param clientId id клиента
   * @param clientSecret secret клиента
   * @returns Observable с true, если успешно,
   * и с false в противном случае. 
   */
  public tryGetToken(clientId: string, clientSecret: string): Observable<boolean> {
    localStorage.setItem('clientId', clientId);
    localStorage.setItem('clientSecret', clientSecret);

    const authStream$ =  this.http.post(this.oathUrl, {
        'client_id': this.clientId,
        'client_secret': this.clientSecret,
        'grant_type': 'client_credentials'
      }, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    })
    .pipe(
      share(), 
      catchError((error) => {console.log(error); return of(error);})
    );

    authStream$.subscribe(response => {
      localStorage.setItem('token', response.access_token);
    });

    return authStream$.pipe(map((response) => !(response instanceof HttpErrorResponse)));
  }

  public isAuthenticated() {
    if (this.token !== '' && this.token !== undefined &&  this.token !== 'undefined' && this.token !== null) {
      return true;
    }

    localStorage.removeItem('clientId');
    localStorage.removeItem('clientSecret');
    localStorage.removeItem('token');

    return false; 
  }
}
