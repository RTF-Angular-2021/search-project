import { MyItem } from "./item";

export class CategoryItemView implements MyItem{
    public id: string;
    public name: string;
     
    constructor(item: any) {
        this.id = item.id;
        this.name = item.name;
    }
}