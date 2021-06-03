export interface Item {
    id: string;
}

export class CategoryModels implements Item{
    public id: string;
    public name: string;

    constructor(item: any) {
        this.id = item.id;
        this.name = item.name;
    }
} 