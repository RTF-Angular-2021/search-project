import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SortTypeService } from '../../data/services/sort-type.service';
import { TwichHttpService } from '../../data/services/twich-http.service';

@Component({
  selector: 'app-query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.css']
})
export class QueryFilterComponent implements OnInit{
  public formFilter!: FormGroup;

  constructor(
    private twichService: TwichHttpService, 
    private sortService: SortTypeService
  ) {}

  ngOnInit() {
    this.initForm();

    this.formFilter.valueChanges.subscribe(value => {
      this.twichService.requestType = value['requestType'];
      this.sortService.sortType = value['sortType'];
      this.twichService.showContent = false;
    })
  }

  private initForm() {
    this.formFilter = new FormGroup ({
      requestType: new FormControl("categories"),
      sortType: new FormControl("relevance")
    });
  }
}
