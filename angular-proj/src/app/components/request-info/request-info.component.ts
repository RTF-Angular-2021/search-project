import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { TwichHttpService } from '../../data/services/twich-http.service';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.css']
})
export class RequestInfoComponent implements OnInit {
  public formInfo!: FormGroup;
  public quantity: number;

  constructor(private twichService: TwichHttpService) {
    this.quantity = 20;
  }

  ngOnInit(): void {
    this.initForm();

    this.formInfo.valueChanges.subscribe(value => {
      this.twichService.first = value['itemQuantity'];
      this.quantity = value['itemQuantity'];
      this.twichService.showContent = false;
    })
  }

  private initForm() {
    this.formInfo = new FormGroup ({
      itemQuantity: new FormControl(20)
    });
  }
}
