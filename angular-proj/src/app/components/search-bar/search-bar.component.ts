import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SortTypeService } from '../../data/services/sort-type.service';
import { TwichHttpService } from '../../data/services/twich-http.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  public formBar!: FormGroup;
  public query: string = "";

  private querySubscription: Subscription;

  constructor(
    public twichService: TwichHttpService,
    private sortService: SortTypeService,
    private route: ActivatedRoute
  ) {
    this.querySubscription = route.queryParams.subscribe( (queryParam) => {
      this.query = queryParam['query'];
    });
  }

  ngOnInit(): void {
    this.initForm();

    this.formBar.valueChanges.subscribe(value => {
      this.query = value["queryInput"];
      if (!this.query) {
        this.twichService.showContent = false;
      }
    })
    if (this.query) {
      this.changeState(false);
    }
  }

  private initForm() {
    this.formBar = new FormGroup ({
      queryInput: new FormControl("")
    });
  }

  changeState(addToHistory: boolean) {
    if (addToHistory) {
      this.addQueryToHostory();
    }
    if (this.query) {
      this.twichService.query = this.query;
      this.twichService.showContent = true;
    }
  }

  private addQueryToHostory() {
    const tmp = localStorage.getItem("queryStorage");
    let queryStorage = tmp ? JSON.parse(tmp) : [];
    queryStorage.push({ 
      title: this.query, 
      requestType: this.twichService.requestType,
      quantity: this.twichService.first,
      sortType: this. sortService.sortType
    });
    localStorage.setItem("queryStorage", JSON.stringify(queryStorage));
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
