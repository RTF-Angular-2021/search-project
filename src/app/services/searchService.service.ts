import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Users } from "../models/users.model";
import { SettingsService } from "./settingsService.service";
import { Repositories } from "../models/repositories.model";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(private http: HttpClient, private settingsService: SettingsService) { }

    public getUsers(q: string): Observable<Users> {
        if (this.settingsService.searchType === 'users') {
            switch (this.settingsService.sortType) {
                case 'relevance':
                    return this.http.get<Users>(`https://api.github.com/search/users?q=${q}`);
                case 'date_desc':
                    return this.http.get<Users>(`https://api.github.com/search/users?q=${q}&sort=joined&order=desc`);
                case 'date_asc':
                    return this.http.get<Users>(`https://api.github.com/search/users?q=${q}&sort=joined&order=asc`);
                default:
                    throw new Error(`Unknown sortType = ${this.settingsService.sortType}`);
            }
        }
        throw new Error('searchType != "users"');
    }

    public getRepositories(q: string): Observable<Repositories> {
        if (this.settingsService.searchType === 'repositories') {
            switch (this.settingsService.sortType) {
                case 'relevance':
                    return this.http.get<Repositories>(`https://api.github.com/search/repositories?q=${q}`);
                case 'stars_desc':
                    return this.http.get<Repositories>(`https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc`);
                case 'stars_asc':
                    return this.http.get<Repositories>(`https://api.github.com/search/repositories?q=${q}&sort=stars&order=asc`);
                default:
                    throw new Error(`Unknown sortType = ${this.settingsService.sortType}`);
            }
        }
        throw new Error('searchType != "users"');
    }
}