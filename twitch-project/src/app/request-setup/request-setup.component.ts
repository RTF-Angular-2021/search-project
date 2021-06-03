import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SortType } from '../services/sort-type.service';
import { TwichApiService } from '../services/twitch-api.service';

@Component({
  selector: 'app-request-setup',
  templateUrl: './request-setup.component.html',
  styleUrls: ['./request-setup.component.scss']
})
export class RequestSetupComponent implements OnInit{
  public Filter!: FormGroup;
  constructor(
    private twichService: TwichApiService, 
    private sortService: SortType
  ) {}
  private initForm() {
    this.Filter = new FormGroup ({
      requestType: new FormControl("categories"),
      sortType: new FormControl("relevance")
    });
  }
  public ngOnInit() {
    this.initForm();
    this.Filter.valueChanges.subscribe(value => {
      this.twichService.requestType = value['requestType'];
      this.sortService.sortType = value['sortType'];
      this.twichService.showContent = false;
    })
  }
}

