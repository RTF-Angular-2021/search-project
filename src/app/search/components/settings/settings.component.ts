import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./styles/settings.component.css']
})
export class SettingsComponent {

  public myEnum = Settings;

  @Input()
  public status: boolean;

  @Input()
  public count: number;

  @Output()
  public checkValueSelect: EventEmitter<Settings> = new EventEmitter();
  
  // @Input()
  // public sortFromNewToOld: boolean;

  // @Input()
  // public sortFromOldToNew: boolean;

  constructor() { }

  public setCurrentSelect(e: Event): void {
    for (let n in this.myEnum) {
      if (this.myEnum[n] === (e.target as HTMLTextAreaElement).value) {
        console.log(this.myEnum[n])
        this.checkValueSelect.emit(this.myEnum[n]);
      }
    }
  }
}


export enum Settings {
  repository = "Репозиторий",
  users = "Пользователи",
  relevance = "Релевантности",
  newToOld = "Новые - Старые",
  oldToNew = "Старые - Новые",
}
