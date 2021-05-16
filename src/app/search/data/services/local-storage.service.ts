import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public allRowsInLocalStorage: any[] = [];
  
  constructor() { }

  public addToLocalStorage(val: string, options: any): void {
    console.log(options);
    if (localStorage.getItem("data")) {
      this.allRowsInLocalStorage = JSON.parse(localStorage.getItem("data"));
      this.allRowsInLocalStorage.push({value: val}, options);
      localStorage.setItem("data", JSON.stringify(this.allRowsInLocalStorage));
    } else {
      this.allRowsInLocalStorage.push({value: val}, options);
      localStorage.setItem("data", JSON.stringify(this.allRowsInLocalStorage));
    }
  }

  public removeFromLocalStorage(name: string): void {
    localStorage.removeItem(name);
  }

  public getFromLocalStorage(name: string): any {
    return localStorage.getItem(name);
  }
}
