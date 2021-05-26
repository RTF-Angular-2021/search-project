import { MyItem } from "./item";

export class ChannelItemView implements MyItem{
    public id: string;
    public name: string;
    public gameName: string;
    public description: string;
    public isLiveNow: boolean;
     
    constructor(item: any) {
        this.id = item.id;
        this.name = item.display_name;
        this.gameName = item.game_name ? item.game_name : "NONE"; 
        this.description = item.title ? item.title : "NONE";
        this.isLiveNow = item.is_live;
    }
}