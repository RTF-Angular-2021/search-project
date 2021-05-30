import {Item} from 'src/app/search/categories/categories.models'

export class ChannelsModel implements Item{
    public id: string;
    public name: string;
    public description: string;
     
    constructor(item: any) {
        this.id = item.id;
        this.name = item.display_name; 
        this.description = item.title;

    }
}