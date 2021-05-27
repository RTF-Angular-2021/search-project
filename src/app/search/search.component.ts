import {Component, Input} from '@angular/core';
import {Repository, User} from '../app.component';

@Component({
  selector: 'app-post',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() user: User;
  @Input() repo: Repository;
  @Input() toggle = false;
}
