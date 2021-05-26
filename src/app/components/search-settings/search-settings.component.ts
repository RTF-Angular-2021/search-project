import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SettingsService } from "../../services/settingsService.service";

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.component.html',
  styleUrls: ['./search-settings.component.css']
})

export class SearchSettingsComponent implements OnInit {

  public searchType = new FormControl('users');
  public sortType = new FormControl('relevance');

  constructor(private settingsService: SettingsService) {
    this.searchType.valueChanges.subscribe(newValue => {
      this.settingsService.searchType = newValue;
    })

    this.sortType.valueChanges.subscribe(newValue => {
      this.settingsService.sortType = newValue;
    })
  }

  ngOnInit(): void {
    this.settingsService.searchType = this.searchType.value;
    this.settingsService.sortType = this.sortType.value;
  }
}
