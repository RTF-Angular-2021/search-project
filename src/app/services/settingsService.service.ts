import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    public searchType?: string;
    public sortType?: string;

    constructor() { }
}