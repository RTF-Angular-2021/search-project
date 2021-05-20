import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public allRowsInLocalStorage: IFromLocalStorage[] = [];

  constructor() { }

  public addToLocalStorage(value: string, options: IOptions): void {
    const obj: IFromLocalStorage = {
      value,
      options
    }
    if (localStorage.getItem("data1")) {
      this.allRowsInLocalStorage = JSON.parse(localStorage.getItem("data1"));
    }
    if (value !== "") {
      this.allRowsInLocalStorage.push(obj);
      localStorage.setItem("data1", JSON.stringify(this.allRowsInLocalStorage));
    }
  }

  public removeFromLocalStorage(name: string): void {
    localStorage.removeItem(name);
  }

  public getFromLocalStorage(name: string): string {
    return localStorage.getItem(name);
  }
}


export interface IFromLocalStorage {
  value: string,
  options: IOptions
}

export interface IOptions {
  user: boolean,
  repo: boolean,
  normalSort: boolean,
  reverseSort: boolean
}
