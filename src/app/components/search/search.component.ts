import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';;
import { Repository } from '../../models/repository.model';
import { User } from '../../models/user.model';
import { SearchService } from '../../services/searchService.service';
import { SettingsService } from '../../services/settingsService.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public searchInput = new FormControl();
  public users?: User[];
  public repositories?: Repository[];

  constructor(private gitHubService: SearchService, public settingsService: SettingsService) { }

  public search(): void {
    if (this.settingsService.searchType === 'users') {
      this.gitHubService.getUsers(this.searchInput.value).subscribe(users => this.users = users.items);
      this.saveHistory();
      return;
    }

    if (this.settingsService.searchType === 'repositories') {
      this.gitHubService.getRepositories(this.searchInput.value).subscribe(repositories => this.repositories = repositories.items);
      this.saveHistory();
      return;
    }

    throw new Error(`Unknown searchType = ${this.settingsService.searchType}`);
  }

  public saveHistory(): void {
    const localHistory = localStorage.getItem('history');
    if (localHistory) {
      let oldValues: Array<string> = JSON.parse(localHistory);

      const elementIndex = oldValues.indexOf(this.searchInput.value);
      if (elementIndex >= 0)
        oldValues = oldValues.filter((value, index) => index !== elementIndex);

      oldValues.push(this.searchInput.value);
      localStorage.setItem('history', JSON.stringify(oldValues));
    } else {
      localStorage.setItem('history', JSON.stringify([this.searchInput.value]));
    }
  }
}
