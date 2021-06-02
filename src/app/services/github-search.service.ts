import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { Iuser } from '../interfaces/Iuser';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class GithubSearchService {
    public resultUsers  = [];
    private baseUrl: string = 'https://api.github.com';
    private api = {
        users: '/search/users',
        repositories: '/search/repositories',
    };

    constructor(private httpClient: HttpClient) { }

    getData$(string: string, type: string): Observable<any>{
        if (type === "users"){
            return this.httpClient.get<any>(`${this.baseUrl}${this.api.users}?q=${string}`).pipe(catchError(error => of(null)));
        }
        return this.httpClient.get<any>(`${this.baseUrl}${this.api.repositories}?q=${string}`).pipe(catchError(error => of(null)));
    }
}
