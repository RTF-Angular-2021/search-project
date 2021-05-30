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
  public q: string = "";
  private qSubscription: Subscription;

  constructor(
    public twichService: TwichApiService,
    private route: ActivatedRoute) {
    this.qSubscription = route.queryParams.subscribe( (qParam) => {
      this.q = qParam['q'];
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
      this.q = value["queryInput"];
      if (!this.q) {
        this.twichService.showContent = false;
      }
    })
    if (this.q) {
      this.change(false);
    }
  }

  public change(addToHistory: boolean) {
    if (addToHistory) {
      this.ToHostory();
    }
    if (this.q) {
      this.twichService.query = this.q;
      this.twichService.showContent = true;
    }
  }

  private ToHostory() {
    const tmp = localStorage.getItem("queryStorage");
    let queryStorage = tmp ? JSON.parse(tmp) : [];
    queryStorage.push({ 
      title: this.q,
    });
    localStorage.setItem("queryStorage", JSON.stringify(queryStorage));
  }
}
