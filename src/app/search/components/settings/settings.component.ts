import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  public myEnum = Settings;

  @Input()
  public status: boolean;

  @Input()
  public count: number;

  @Output()
  public checkValueSelect: EventEmitter<Settings> = new EventEmitter();

  constructor() { }

  public test(e: Event): void {
    for (let n in this.myEnum) {
      if (this.myEnum[n] === (e.target as HTMLTextAreaElement).value) {
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
  oldToNew = "Старые - Новые"
}
