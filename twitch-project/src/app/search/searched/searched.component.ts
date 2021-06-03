import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TwichApiService } from '../../services/twitch-api.service';

@Component({
  selector: 'app-searched',
  templateUrl: './searched.component.html',
  styleUrls: ['./searched.component.scss'],
})
export class SearchedComponent implements OnInit, OnDestroy {
  public Bar!: FormGroup;
  public item: string = "";
  private qSubscription: Subscription;

  constructor(
    public twichService: TwichApiService,
    private route: ActivatedRoute) {
    this.qSubscription = route.queryParams.subscribe( (qParam) => {
      this.item = qParam['q'];
    });
  }
  public ngOnDestroy() {
    this.qSubscription.unsubscribe();
  }
  private Form() {
  this.Bar = new FormGroup ({
      queryInput: new FormControl("")
    });
  }
  public ngOnInit(): void {
    this.Form();
    this.Bar.valueChanges.subscribe(value => {
      this.item = value["queryInput"];
      if (!this.item) {
        this.twichService.showContent = false;
      }
    })
    if (this.item) {
      this.change(false);
    }
  }

  public change(addToHistory: boolean) {
    if (addToHistory) {
      this.ToHostory();
    }
    if (this.item) {
      this.twichService.query = this.item;
      this.twichService.showContent = true;
    }
  }

  private ToHostory() {
    const tmp = localStorage.getItem("queryStorage");
    let queryStorage = tmp ? JSON.parse(tmp) : [];
    queryStorage.push({title: this.item,});
    localStorage.setItem("queryStorage", JSON.stringify(queryStorage));
  }
}
