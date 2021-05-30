import { Component, Input } from '@angular/core';
import { ChannelsModel } from './channels.models'; 

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})

export class ChannelsComponent {
  @Input() channel!: ChannelsModel;

  constructor() {}
}
