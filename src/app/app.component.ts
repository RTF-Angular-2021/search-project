import {Component} from '@angular/core';
import {HttpService} from './http.service';

export class Repository {
  constructor(public name: string,
              public owner: string,
              public url: string,
              public description: string) {}
}

export class User {
  constructor(public name: string, public url: string) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  repos: Repository[] = [];
  reposCount = 0;
  users: User[] = [];
  usersCount = 0;
  toggle = false;

  constructor(private httpService: HttpService) {}

  updatePosts(inquiry: string) {
    this.repos = [];
    this.users = [];
    this.httpService.getData(inquiry)[0].subscribe((data: any) => {
      for (const item of data.items) {
        this.repos.push(new Repository(item.name, item.owner.login,
            item.html_url, item.description));
        this.reposCount = data.total_count;
      }
    });
    this.httpService.getData(inquiry)[1].subscribe((data: any) => {
      for (const item of data.items) {
        this.users.push(new User(item.login, item.html_url));
      }
      this.usersCount = data.total_count;
    });
  }
}
