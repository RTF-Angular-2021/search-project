import { Component, Input } from '@angular/core';

import { ChannelItemView } from '../../data/models/channelItemView'; 

@Component({
  selector: 'app-search-item-channel',
  templateUrl: './search-item-channel.component.html',
  styleUrls: ['./search-item-channel.component.css']
})
export class SearchItemChannelComponent {
  @Input() channel!: ChannelItemView;

  public playing: string = "";

  constructor() {}

  setTitle(): string{
    return this.channel.isLiveNow ? 
     "Сйчас играет в:" : "Последний раз играл в:";
  }
}
