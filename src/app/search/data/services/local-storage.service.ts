import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public allRowsInLocalStorage: any[] = [];
  
  constructor() { }

  public addToLocalStorage(val: string, options: any): void {
    if (localStorage.getItem("data1")) {
      this.allRowsInLocalStorage = JSON.parse(localStorage.getItem("data1"));
    }
    if (val !== "") {
      this.allRowsInLocalStorage.push({value: val, options});
      localStorage.setItem("data1", JSON.stringify(this.allRowsInLocalStorage));
    }
    
  }

  public removeFromLocalStorage(name: string): void {
    localStorage.removeItem(name);
  }

  public getFromLocalStorage(name: string): any {
    return localStorage.getItem(name);
  }
}
